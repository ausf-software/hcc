class Hamming {
	
	bits;
	h_codes_pos;
	error_pos;
	d_classes;
	h_real;

    constructor (bits) {
        this.bits = bits;
		this.h_codes_pos = [];
		this.error_pos = 0;
		this.calculateHCodes();
		this.d_classes = [];
		this.calculateDClasses();
		this.h_real = [];
		this.calculateHReal();
		this.calculateErrorPos();
	}
	
	calculateHCodes() {
		for (var i = 1, step = 0; i < this.bits.length; step++) {
			this.h_codes_pos.push(i);
			i *= 2;
		}
	}
	
	calculateDClasses() {
		for (var class_id = 0; class_id < this.h_codes_pos.length; class_id++) {
			var cl = new DClass(class_id);
			var bit_pos = class_id != 0 ? this.h_codes_pos[class_id] - 1 : 1;
			var step = 1;
			var flag = true;
			for (; bit_pos < this.bits.length; bit_pos++) {
				if (flag && step <= this.h_codes_pos[class_id]) {
					if (!deg_of_2(bit_pos + 1)) {
						cl.addBit(bit_pos);
					}
				}
				if (step % this.h_codes_pos[class_id] == 0) {
					step = 1;
					flag = !flag;
				} else {
					step++;
				}
			}
			this.d_classes.push(cl);
		}
	}
	
	calculateHReal() {
		for (var i = 0; i < this.d_classes.length; i++) {
			this.h_real.push(this.d_classes[i].getSum(this.bits) % 2);
		}
	}
	
	calculateErrorPos() {
		for (var i = 0; i < this.d_classes.length; i++) {
			this.error_pos += 2**i * ((this.bits[this.h_codes_pos[i] - 1] + this.h_real[i]) % 2);
		}
	}
	
	getDClassString(d_class) {
		var str = "";
		var k = 0;
		for (var i = 0; i <= ((k < d_class.bits.length) ? d_class.bits[k] : this.bits.length - 1); i++) {
			if (k < d_class.bits.length && i == d_class.bits[k]) {
				str += getSelectChar(this.bits[i]);
				k++;
			} else {
				str += this.bits[i];
			}
		}
		return str;
	}
	
	toHtmlString() {
		var st = "";
		
		for (var i = 0; i < this.d_classes.length; i++) {
			st += "<p class='answer'>D" + i + " :";
			st += "<p class='answer-item'>" + this.getDClassString(this.d_classes[i]);
			st += "<p class='answer-item'>" + this.d_classes[i].toSumString();
		}
		
		st += "<p><table><thead><tr><th>In the word:</th>";
		
		for (var i = 0; i < this.d_classes.length; i++) {
			st += "<th>" + this.bits[this.h_codes_pos[i] - 1] + "</th>";
		}
		st += "</tr></thead><tbody><tr><th>Real bit:</th>";
		
		for (var i = 0; i < this.d_classes.length; i++) {
			st += "<td>" + this.h_real[i] + "</td>";
		}
		
		st += "</tr><tr><th>Sum:</th>";
		
		for (var i = 0; i < this.d_classes.length; i++) {
			st += "<td>" + ((this.bits[this.h_codes_pos[i] - 1] + this.h_real[i]) % 2) + "</td>";
		}
		st += "</tr></tbody></table>";
		
		st += "<p class='answer'>Error position: ";
		for(var i = 0; i < this.d_classes.length; i++) {
			st += "2^" + i + " * " + ((this.bits[this.h_codes_pos[i] - 1] + this.h_real[i]) % 2);
			if (i != this.d_classes.length - 1) {
				st += " + ";
			}
		}
		st += " = " + this.error_pos;
		return st;
	}
	
};
// 01010110101101100000111101001100111001