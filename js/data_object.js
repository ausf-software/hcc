class DClass {
	
	bits;
	sum;
	step;
	
	constructor(step) {
		this.bits = [];
		this.step = step;
	}
	
	addBit(bit){
		this.bits.push(bit);
	}
	
	getSum(bit) {
		var sum = 0;
		for (var i = 0; i < this.bits.length; i++) {
			sum += bit[this.bits[i]];
		}
		this.sum = sum;
		return sum;
	}
	
	toSumString() {
		return "D" + this.step + " = " + this.sum + " % 2 = " + (this.sum % 2);
	}
	
};