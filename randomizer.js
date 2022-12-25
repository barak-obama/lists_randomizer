



function give_random(list, invert_label_order){
    let rand_obj = list;

    

    if(!isObj(list)){
        return rand_obj;
    }
    var obj_keys = Object.keys(list);
    var ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];
    // console.log(ran_key)
    rand_obj = list[ran_key]

    rand_obj = extract_data(rand_obj);
    var data = rand_obj["data"];
    var lable = rand_obj["lable"];


    if(invert_label_order){
        return  lable + give_random(data, invert_label_order);
    }


    return  give_random(data, invert_label_order) + lable;

}


function multi_random(lists, list_all_names = false, invert_order=false) {
    return lists.map(list => give_random(list,list_all_names, invert_order))
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
