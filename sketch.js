my_width = 800
my_height = 800
nr_blocks = 20
my_block = null
mines = 60
blocks = []
function setup() {
  // put setup code here

  createCanvas(my_width, my_height);
  background(0);

  for(i = 0; i < nr_blocks; i++) {
  	blocks[i] = []
  }

  for(i = 0; i < nr_blocks; i++) {
  	for (j = 0; j < nr_blocks; j++) {
  		blocks[i][j] = new Block(i, j, my_width/nr_blocks)
  	}
  }

  mines_cop = mines


  while(mines_cop > 0) {

  	let rx = floor(random(nr_blocks));
  	let ry = floor(random(nr_blocks));
  	if(blocks[rx][ry].isBomb() == false) {
  		blocks[rx][ry].bomb = true
  		mines_cop--;
  	}
  }

  for(i = 0; i < nr_blocks; i++) {
  	for(j = 0; j < nr_blocks; j++) {


  		if(blocks[i][j].isBomb() == true) {
  			continue;
  		}

  		no_near_bombs = 0

  		for(k = -1; k < 2; k++) {
  			for (l = -1; l < 2; l++) {
  				if(i + k >= 0 && i + k < nr_blocks && j + l >=0 && j + l < nr_blocks) {
  					if(k == 0 && l == 0)
  						continue

  					if(blocks[i + k][j + l].bomb == true) {
  						no_near_bombs++
  					}
  				}
  			}
  		}
  		blocks[i][j].setNumber(no_near_bombs)

  	}
  }

}

function draw() {
  // put drawing code here

  // my_block.draw()

  for(i = 0; i < nr_blocks; i++) {
  	for (j = 0; j < nr_blocks; j++) {
  		blocks[i][j].draw()
  	}
  }


}

function mouseClicked() {
	// console.log(blocks)
	i = 0
	j = 0
	while(i * my_width/nr_blocks < mouseX) {
		i++
	}

	while(j * my_width/nr_blocks < mouseY) {
		j++
	}

	blocks[i - 1][j - 1].isClicked()


	if(blocks[i - 1][j - 1].bomb) {
		// sleep(2000)
		setup()
	}
	// setup()

}

function mousePressed(event) {
	if(event.buttons == 4) {
		i = 0
		j = 0
		while(i * my_width/nr_blocks < mouseX) {
			i++
		}

		while(j * my_width/nr_blocks < mouseY) {
			j++
		}
		if(blocks[i - 1][j - 1].clicked == false)
			blocks[i - 1][j - 1].putFlag()
	}


  	// console.log(event.buttons);
}