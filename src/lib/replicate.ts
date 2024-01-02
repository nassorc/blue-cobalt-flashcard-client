interface ClassArgs {
  auth: string;
}
interface RunFnInput {
  image: string;
  caption?: string;
  question?: string;
}
interface RunFnOutput {
  output: string;
  status: string;
}
class MockReplicate {
  auth: string;
  constructor(auth: string) {
    this.auth = auth;
  }
  public run(model: string, input: RunFnInput): RunFnOutput {
    console.log("running model");
    return {
      output:
        "https://images.unsplash.com/photo-1692290997682-cfd9aadd0fd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=900&q=60",
      status: "succeeded",
    };
  }
}

export default MockReplicate;
