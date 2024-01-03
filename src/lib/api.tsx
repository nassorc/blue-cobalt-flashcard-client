// GET OPTIONS
const getOpts: RequestInit = {
  method: "GET",
  credentials: "include",
};
let postOpts: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export async function getUserProfile() {
  const res = await fetch("http://localhost:3001/user/me", getOpts);
  return await res.json();
}

export async function listUsers(args: { limit: number; skip: number }) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    query.append(key, value);
  }

  const res = await fetch(
    "http://localhost:3001/user/me?" + query.toString(),
    getOpts,
  );
  return await res.json();
}

export async function validateToken(
  token: string,
): Promise<{ valid: boolean }> {
  const res = await fetch("http://localhost:3001/user/token/validate", getOpts);
  return await res.json();
}

export async function login(credentials: any) {
  let requestObj = { ...postOpts, body: JSON.stringify(credentials) };
  const res = await fetch("http://localhost:3001/user/login", requestObj);
  console.log(res.headers);
  if (!res.ok) {
    const code = res.status;
    switch (code) {
      case 400:
        throw new Error("Enter a valid email and password.");
      case 401:
      case 403:
        throw new Error("Invalid email or password");
      case 500:
        throw new Error("Something went wrong. Please try again later");
    }
  }
  return await res.json();
}

export async function logout() {
  await fetch("http://localhost:3001/user/logout", postOpts);
}

export async function register(credentials: any) {
  let requestObj = { ...postOpts, body: JSON.stringify(credentials) };
  return await fetch("http://localhost:3001/user/", requestObj);
}

export async function gradeCard({
  cardId,
  deckId,
  grade,
}: {
  cardId: string;
  deckId: string;
  grade: number;
}) {
  const res = await fetch(
    `http://localhost:3001/deck/${deckId}/card/${cardId}/grade`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ grade }),
    },
  );
  return await res.json();
}

export async function createDeck(deck: any) {
  const formData = new FormData();
  for (let [key, value] of Object.entries(deck)) {
    if (key !== "deckImage") {
      formData.append(key, JSON.stringify(value));
    } else {
      if (typeof value === "string" || value instanceof Blob) {
        formData.append(key, value);
      }
    }
  }
  let requestObj = { ...postOpts, body: JSON.stringify(deck) };
  const res = await fetch("http://localhost:3001/deck", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export async function addCard(args: any) {
  const res = await fetch("http://localhost:3001/user/register");
  return await res.json();
}

export async function deleteDeck(deckId: string) {
  await fetch(`http://localhost:3001/deck/delete/${deckId}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function getTask({ deckId }: { deckId: string }) {
  const res = await fetch(`http://localhost:3001/deck/${deckId}/task`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
}
