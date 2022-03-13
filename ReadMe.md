## Solend StSol Obligation Parsooor
- This repo queries solend for all of the deposits and borrowing for users that have StSol as collateral 
- it currently will save a json array to the file ```finale_obligations.json``` with the fields 
    - owner 
    - type
    - amount 
    - reserve
    - mint 
    - symbol 
    - name 
    - decimals
    
For every deposit or loan a user has provided they have StSol as collateral

To run the script run 
``` yarn install ```
``` yarn run start ```