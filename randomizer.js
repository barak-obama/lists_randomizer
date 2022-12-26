



function give_random(list, invert_label_order){
	return new Promise((resolve, reject) => {

    		let rand_obj = list;
		if(!isObj(list)){
        		resolve(rand_obj);
			return;
    		}
    		var obj_keys = Object.keys(list);
    		var ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];
		rand_obj = list[ran_key]

		rand_obj = extract_data(rand_obj);
		var data = rand_obj["data"];
    		var lable = rand_obj["lable"];


    		if(invert_label_order){
        		give_random(data, invert_label_order).then(new_rand => resolve(lable + new_rand));
			return;
    		}
		give_random(data, invert_label_order).then(new_rand => resolve(new_rand + lable));
	});
}


function multi_random(lists, list_all_names = false, invert_order=false) {
    return Promise.all(lists.map(list => give_random(list,list_all_names, invert_order)))
}


function isObj(x){
    return typeof x === 'object' &&
    // !Array.isArray(x) &&
    x !== null
}

function isPrimitive(test) {
    return test !== Object(test);
}



function extract_data(obj){

    if(!isPrimitive(obj) && 'data' in obj && 'lable' in obj){
        return {"data": obj["data"], "lable": obj["lable"]}
    }

    return {"data": obj, "lable": ""}

}

