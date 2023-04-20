class DClass {
	
	bits;
	
	constructor() {
		this.bits = [];
	}
	
	addBit(bit){
		this.bits.push(bit);
	}
	
	getSum(bit) {
		var sum = 0;
		for (var i = 0; i < this.bits.length; i++) {
			sum += bit[this.bits[i]];
		}
		return sum;
	}
	
};