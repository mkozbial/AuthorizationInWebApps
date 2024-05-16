export class FBPost {
    constructor(postId, userId, userEmail, title, text, dateAdded, visibility) {
        this.postId = postId;
        this.userId = userId;
        this.userEmail = userEmail;
        this.title = title;
        this.text = text;
        this.dateAdded = dateAdded;
        this.visibility = visibility;
    }
    serialize() {
        return JSON.parse(JSON.stringify({
            userId: this.userId,
            userEmail: this.userEmail,
            title: this.title,
            text: this.text,
            dateAdded: this.dateAdded,
            visibility: this.visibility
        }));
    }

    static deserialize(postId, jsonString) {
        const { userId, userEmail, title, text, dateAdded, visibility } = JSON.parse(JSON.stringify(jsonString));
        return new FBPost(postId, userId, userEmail, title, text, new Date(dateAdded), visibility);
    }
}