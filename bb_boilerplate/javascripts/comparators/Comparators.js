(function (Comparators) {
	Comparators.date = function (field, dir) {
		var desc = function (a, b) {
			var valA = new Date(a.get(field)),
			    valB = new Date(b.get(field));

			// drop time
			valA = new Date(valA.getFullYear(), valA.getMonth() + 1, valA.getDate());
			valB = new Date(valB.getFullYear(), valB.getMonth() + 1, valB.getDate());

			if (valA > valB) return -1;
			if (valA < valB) return 1;
			return 0;
		};

		var asc = function (a, b) {
			var valA = a.get(field),
			    valB = b.get(field);

			// drop time
			valA = new Date(valA.getFullYear(), valA.getMonth() + 1, valA.getDate());
			valB = new Date(valB.getFullYear(), valB.getMonth() + 1, valB.getDate());

			if (valA < valB) return -1;
			if (valA > valB) return 1;
			return 0;
		};

		return !dir || dir === 'asc' ? asc : desc;
	};

	Comparators.dateTime = function (field, dir) {
		var desc = function (a, b) {
			var valA = a.get(field),
			    valB = b.get(field);

			if (valA > valB) return -1;
			if (valA < valB) return 1;
			return 0;
		};

		var asc = function (a, b) {
			var valA = a.get(field),
			    valB = b.get(field);

			if (valA < valB) return -1;
			if (valA > valB) return 1;
			return 0;
		};

		return !dir || dir === 'asc' ? asc : desc;
	};
})(module('Comparators'));