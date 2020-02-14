class Tower{
    constructor(game, x, y, width, height, sprite, assetMan){
        this.game = game;
        this.ctx = this.game.ctx;
        this.x = x;
        this.y = y;
        this.shotX = this.x + width/2;
        this.shotY = this.y + height/3;
        this.width = width;
        this. height = height;
        this.sprite = sprite;
        this.assets = assetMan;
        this.fireThresh = 0;
        this.radius = 200;
        this.enemies = [];
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    draw(){
        this.ctx.drawImage(this.sprite, this.x, this.y,);
    }

    update(){
        this.enemies = [];
        var ent = null;
        if(this.fireThresh === 0){
            for(var i = 0; i < this.game.enemyEntities.length; i++){
                ent = this.game.enemyEntities[i];
                if(this.distance(ent) <= this.radius){
                    console.log("found enemy");
                    this.enemies.push(ent);
                }
            }
            this.fireProjectile();
            this.fireThresh = 100;
        }else{
            this.fireThresh--;
        }
    }

    distance(other){
        return Math.sqrt((other.x + other.width/2 - this.shotX)**2 + (other.y + other.height/2 - this.shotY)**2);
    }

    fireProjectile(){
        for(var i = 0; i < this.enemies.length; i++){
            //console.log("Fire");
            console.log("enemy x:" + this.enemies[i].x);
            console.log("enemy y:" + this.enemies[i].y);
            var interceptPoint = this.intercept(this.enemies[i], 3);
            if(interceptPoint){
                console.log("x: "+ interceptPoint.x + " y: " + interceptPoint.y);
                //console.log("Fired");
                addProjectile(this.shotX, this.shotY, interceptPoint);
            }else{
                addProjectile(this.shotX, this.shotY, {x: this.enemies[i].x, y: this.enemies[i].y});
            }
        }
        
    }

    intercept(dst, v) {
        var tx = dst.x - this.x;
        var ty = dst.y - this.y;
        var tvx = dst.xVelocity;
        var tvy = dst.yVelocity;
      
        // Get quadratic equation components
        var a = tvx*tvx + tvy*tvy - v*v;
        var b = 2 * (tvx * tx + tvy * ty);
        var c = tx*tx + ty*ty;    
      
        // Solve quadratic
        var ts = this.quad(a, b, c); // See quad(), below
      
        // Find smallest positive solution
        var sol = null;
        if (ts) {
          var t0 = ts[0], t1 = ts[1];
          var t = Math.min(t0, t1);
          if (t < 0) t = Math.max(t0, t1);    
          if (t > 0) {
            console.log("t: " + t);
            sol = {
              x: dst.x + dst.xVelocity*t,
              y: dst.y + dst.yVelocity*t
            };
          }
        }
        return sol;
    }
      
    quad(a,b,c) {
        var sol = null;
        if (Math.abs(a) < 1e-6) {
          if (Math.abs(b) < 1e-6) {
            sol = Math.abs(c) < 1e-6 ? [0,0] : null;
          } else {
            sol = [-c/b, -c/b];
          }
        } else {
          var disc = b*b - 4*a*c;
          if (disc >= 0) {
            disc = Math.sqrt(disc);
            a = 2*a;
            sol = [(-b-disc)/a, (-b+disc)/a];
          }
        }
        return sol;
    }
}