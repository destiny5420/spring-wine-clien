class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }
}

export default Vec2
