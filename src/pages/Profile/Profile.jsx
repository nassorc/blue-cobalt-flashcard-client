// return(
//     <section className={styles['container']} style={{marginTop: '1rem'}}>
//         <Group style={{marginBottom: '1.2rem', justifyContent: 'space-between'}}>

//             <div>
//                 <h1>Edit Deck</h1>
//                 <p>Edit deck and click the save button to save any changes.</p>
//             </div>
//             <div>
//                 <button onClick={handleSaveDeck} style={{marginRight: '4px'}}>Save</button>
//                 <button onClick={handleCancel} style={{marginRight: '4px'}}>Cancel</button>
//                 <button onClick={handleDeleteDeck}>Delete</button>
//             </div>

//         </Group>
//         <Group shadow={1} style={{flexDirection: 'column', paddingBottom: '100px'}}>
//             <div style={{position: 'relative', backgroundColor: 'darkseagreen', width: '100%', height: '10rem'}}>
//             <div style={
//                     {
//                         display: 'flex',
//                         alignItems: 'center',
//                         position: 'relative',
//                         top: '130px',
//                         left: '20px',
//                     }}>
//                 <div style={
//                     {
//                         width: '110px', 
//                         height: '110px',
//                         backgroundColor: 'brown',
//                         borderRadius: '50%',
//                         overflow: 'hidden',
//                         border: '10px solid white'
//                     }}>
//                     {
//                     (deck?.deckImage)
//                         ? <img src={deck?.deckImage} width="100%" alt="deck image"/>
//                         : <div style={{backgroundColor: 'pink', width: '100%', height: '100%'}}></div>
//                     }
//                 </div>
//                 <div style={{marginInline: '1rem', marginTop: '2rem'}}>
//                     <InputSm  
//                         type="text" 
//                         value={deckName} 
//                         onChange={(e) => {setDeckName(e.target.value); }}
                        
//                     />
//                     <p>Deck description goes here.</p>
//                 </div>
                
//             </div>
//             <div style={
//                     {
//                         position: 'relative',
//                         left: '80%',
//                         top: '45px',
//                         maxWidth: '220px',
//             }}>
                    
//             </div>
//         </div>

            

        

//         </Group>
        
//         <Group>
//             <div>
//                 <div>
//                     {
//                         (deck?.deckImage)
//                         ? <img src={deck?.deckImage} width="10%" alt="deck image"/>
//                         : null
//                     }
//                     {
//                         (deckImageURL)
//                         ? <img src={deckImageURL} width="10%" alt="deck image"/>
//                         : null
//                     }
                    
//                 </div>
//                 <div>
//                     <label>Deck Name</label>
//                     <input type="text" value={deckName} onChange={(e) => {
//                         setDeckName(e.target.value);
//                     }}/>
//                 </div>
//             </div>
            
//         </Group>
//         <Group>
//             <h3>Deck Settings</h3>

//         </Group>
//         <Group shadow={1}>
//             <div>
//                 <p>Number of cards added each review session</p>
//                 <div><label>new cards:</label> <InputSm type="input" value={newCardCount} onChange={(e) => {
//                     setNewCardCount(e.target.value)
//                 }}/></div>
//                 <div><label>reviewed cards:</label><InputSm type="input" value={reviewedCardCount} onChange={(e) => {
//                     setReviewedCardCount(e.target.value)
//                 }}/></div>

//                 <div>
//                     <p>update deck image</p>
//                     <input 
//                         type="file" accept=".jpg, .jpeg, .png" 
//                         id="img-field"
//                         onChange={async (e) => {
//                             setDeckImageFile(e.target.files[0])
//                             const {handleUploadImageEvent} = await import('../../utils/uploadImage')
//                             handleUploadImageEvent(e.target.files, setDeckImage, setDeckImageName)
//                         }}
//                     />
//                     <div style={{width: "100px", height: "100px", overflow: "hidden"}}>
//                         {DeckImageComponent}
//                     </div>
//                 </div>
//             </div>
            
//         </Group>
//         <Group><h3>Cards</h3></Group>
//         <Group>
//             <div>
//                 <InputCard  setModifiedCards={setModifiedCards}/>
//                 {CardList}
//             </div>
//         </Group>
//     </section>
// )