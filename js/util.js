// ❶
// ⓪ ①
// 
function deg_of_2 (x) {
    return (x <= 0) ? false : (x & (x-1)) == 0;    
}

function getSelectChar (x) {
	switch (x) {
		case 0:
			return "⓪";
		case 1:
			return "①";
	}
}