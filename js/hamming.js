class Hamming {
	
	bits;
	h_codes_pos;
	error_pos;
	d_classes;
	

    constructor (bits) {
        this.bits = bits;
		this.h_codes_pos = [];
		this.error_pos = -1;
		this.calculateHCodes();
		this.d_classes = [];
		//console.log(bits.length);
		this.calculateDClasses();
		
		console.log(this.h_codes_pos);
		console.log(this.d_classes);
		
		var eror = 0;
		for (var i = 0; i < this.d_classes.length; i++) {
			//console.log(this.d_classes[i].getSum());
			this.printDClass(this.d_classes[i]);
			//eror += 2**(i) * (this.d_classes[i].getSum() % 2);
		}
		console.log(eror);
	}
	
	calculateHCodes() {
		for (var i = 1, step = 0; i < this.bits.length; step++) {
			this.h_codes_pos.push(i);
			i *= 2;
		}
	}
	
	calculateDClasses() {
		for (var class_id = 0; class_id < this.h_codes_pos.length; class_id++) {
			var cl = new DClass();
			var bit_pos = ((class_id != 0) ? this.h_codes_pos[class_id] : 2);
			var step = 1;
			for (; bit_pos < this.bits.length; bit_pos++, step++) {
				//if (!deg_of_2(bit_pos + 1)) {
					cl.addBit(bit_pos);
				//}
				if (step == 2**(class_id)) {
					bit_pos += 2**(class_id);
					step = 0;
				}
			}
			console.log(step);
			this.d_classes.push(cl);
		}
	}
	
	printDClass(d_class) {
		var str = "";
		var k = 0;
		for (var i = 0; i < ((k < d_class.bits.length) ? d_class.bits[k] : this.bits.length); i++) {
			if (k < d_class.bits.length && i == d_class.bits[k] - 1) {
				str += getSelectChar(this.bits[i]);
				k++;
			} else {
				str += this.bits[i];
			}
		}
		console.log(str);
	}
	
};