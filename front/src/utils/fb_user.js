class FBUser {
    constructor(uid = null, email = null, accountType = null) {
      this.uid = uid;
      this.email = email;
      this.accountType = accountType;

      return this;
    }

    serialize() {
        return JSON.parse(JSON.stringify({
          "email": this.email,
          "accountType": this.accountType,
        }));
      }
    
    static deserialize(uid, jsonString) {
        const data = JSON.parse(jsonString);
        return new FBUser(uid, data.email, data.accountType);
    }
  }

export { FBUser };