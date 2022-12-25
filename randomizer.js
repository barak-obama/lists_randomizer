
function give_random(list, list_all_names = false){
    var rand_obj = list;
    var prefix = "";

//    if(is_valid(list)){

  //  }
    // console.log(isObj(list))
    if(!isObj(list)){
        return rand_obj;
    }
    var obj_keys = Object.keys(list);
    var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
    // console.log(ran_key)
    rand_obj = list[ran_key]
    // console.log(Array.isArray(list) + " " + list);

    if(list_all_names && !Array.isArray(list)) {
        // console.log("test")
        prefix = ran_key;
	if('display_name' in ran_obj){}

    }

//    if('data' in rand_obj){
//        rand_obj = rand_obj['data']
//    }

    return  give_random(rand_obj, list_all_names) + prefix;

}


function multi_random(lists, list_all_names = false) {
    return lists.map(list => give_random(list))
}


function isObj(x){
    return typeof x === 'object' &&
    // !Array.isArray(x) &&
    x !== null
}
