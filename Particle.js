class Particle {
    constructor(position) {
        this.acc = createVector(0, 0);
        this.vel = p5.Vector.random2D();
        
        this.randomCross = createVector(random(-1, 1), random(-1, 1));
        this.pos = position.copy();
        this.lifetime = 1000;
        this.r = 10;
    }

    run(love, RB) {
        this.update(love);
        this.display(love, RB);
        this.edge();
        this.bomb(love);
    }


    edge() {
        if (this.pos.y > height - this.r / 2) {
            this.vel.y = this.vel.y * -1;
            this.pos.y = height - this.r / 2;
            this.vel.setMag(0.8);
        }

        if (this.pos.y < this.r / 2) {
            this.vel.y = this.vel.y * -1;
            this.pos.y = this.r / 2;
            this.vel.setMag(0.8);
        }

        if (this.pos.x > width - this.r / 2) {
            this.vel.x = this.vel.x * -1;
            this.pos.x = width - this.r / 2;
            this.vel.setMag(0.8);
        }

        if (this.pos.x < this.r / 2) {
            this.vel.x = this.vel.x * -1;
            this.pos.x = this.r / 2;
            this.vel.setMag(0.8);
        }
    }

    bomb(love) {
        if ( love >= 90) {
            this.bombF = p5.Vector.random2D();
            this.bombF.mult(0.4);
            this.acc.add(this.bombF);
            this.lifetime -= 4;
        }
    }

    update(love) {
        this.acc.setMag(love / 100);
        this.vel.add(this.acc);
        this.vel.mult(this.randomCross);
        this.pos.add(this.vel);
        this.lifetime -= 2;
        this.r -= 1;

        if(this.r<= 1){
            this.r = 1;
        }
    }

    display(love, RB) {
        noStroke();
        if(love >= 90){
            fill(random(150,220), random(150, 220), random(150, 220), this.lifetime);
        } else {
            fillColor();
        }

        ellipse(this.pos.x, this.pos.y, this.r);
    }

    isDead() {
        return this.lifetime < 0;
    }
}

function fillColor(){
    if(RB<0.25){
        fill(random(255), random(150), random(150), this.lifetime);
      } else if( RB < 0.50){
        fill(random(20), random(20), random(250), this.lifetime);
      } else if (RB < 0.75){
        fill(random(255), random(150), random(150), this.lifetime);
      } else if (RB <= 1) {
        fill(random(255), random(150), random(150), this.lifetime);
        this.r = 2;
      }
}