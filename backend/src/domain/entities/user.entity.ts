
export class UserEntity{
    private email:string;
    private password:string;

    constructor(email:string,password:string){
        this.email=email;
        this.password=password;
    }

 
     getEmail():string{
        return this.email;
    }
     getPassword():string{
        return this.password;
    }

  
    setEmail(email:string):void{
        this.email=email;
    }
    setPassword(password:string):void{
        this.password=password;
    }
    toPlainObject():object {
        return{email:this.email,password:this.password}
    }
    
}