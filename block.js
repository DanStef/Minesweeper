class Block {

  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.clicked = false
    this.bomb = false
    this.number = -1
    this.flag = false
  }

  draw() {
  	// noFill();

  	if(this.clicked)
		fill(200)
	else
		fill(170)

	if(this.flag == true) {
		fill(255, 0, 0)
	}
    rect(this.x * this.size, this.y * this.size, this.size, this.size);

    if(this.clicked && this.number != 0) {
    	textSize(25);
	    fill(0)
		text(this.number.toString(), this.x * this.size + this.size/3.0, this.y * this.size + this.size/1.4)
	}
  }

  isClicked() {
  	this.clicked = true

  	var arr = []
  	arr.push(this)
  	// console.log(countFlags())
  	if(this.number == 0 || this.number == this.countFlags()) {

  		while(arr.length > 0) {

  			var b = arr.pop()
  			var x = b.x
  			var y = b.y
		  	for(k = -1; k < 2; k++) {
				for (l = -1; l < 2; l++) {
					if(x + k >= 0 && x + k < 20 && y + l >=0 && y + l < 20) {
						if(k == 0 && l == 0)
							continue
						if(blocks[x + k][y + l].clicked == true || blocks[x + k][y + l].number == -1) {
							continue
						}
						blocks[x + k][y + l].clicked = true
						if(blocks[x + k][y + l].number == 0) {
							arr.push(blocks[x + k][y + l])
						}

					}
				}
			}
		}
	}
  }

  countFlags() {
  	var sum = 0;
  	for(k = -1; k < 2; k++) {
		for (l = -1; l < 2; l++) {
			if(this.x + k >= 0 && this.x + k < 20 && this.y + l >=0 && this.y + l < 20) {
				if(k == 0 && l == 0)
					continue
				if(blocks[this.x + k][this.y + l].flag) {
					sum++
				}

			}
		}
	}

	return sum
  }

  isBomb() {
      return this.bomb
  }

  setBomb() {
  	this.bomb = true
  }

  setNumber(nr) {
  	this.number = nr
  }

  putFlag() {
  	if(this.flag == false)
  		this.flag = true
  	else
  		this.flag = false
  }

}