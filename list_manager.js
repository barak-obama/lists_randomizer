let current_list_name = ""
const current_list_coockie_id = "current_list"
let lists_names = [];

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
  }

function change_list(list_name){
	current_list_name = list_name
	get_list(current_list_name);
	setCookie(current_list_coockie_id, current_list_name, 365)
	refresh_select()
}

function create_new_list(){
	new_list = prompt("Enter list name (can enter existing one to overide the the current value)")
	setCookie(current_list_coockie_id, new_list, 365)
	current_list_name = new_list
	save_current_list(current_list_name)
	delay(10).then(refresh_select)
}

function shuffle(){
	let invert = $('#invert_lable').is(":checked");
	render_lists().then(lists => multi_random(lists, invert)
	).then(random =>
		$('#value_display').html(random)
	).catch(() => $('#value_display').html("JSON Error"))
}

function save_current_list(list_name){
	return render_lists().then( lists => save_list(list_name,lists) )
	
}

function save_list(list_name, list){
	console.log(list_name)
	setCookie("list_"+list_name, JSON.stringify(list) ,365);
}

function get_list(list_name){
	getCookie("list_"+list_name).then(lists => {
		if(lists){
                	insert_data(JSON.parse(lists));
        	}
	});
}

function remove_current_list(list){
	eraseCookie("list_"+list);
	eraseCookie(current_list_coockie_id);
	current_list_name = ""
}

function addOptionToSelect(selectId, optionValue) {
	// Find the select object and append a new option element to it
	$(selectId).append($('<option>', {
	  value: optionValue,
	  text: optionValue
	}));
}


function get_all_lists(){
	cookies = getCookieMap()
	lists_names = []
	for (const [key, value] of Object.entries(cookies)) {
		console.log(`${key}: ${value}`);
		if(key.startsWith("list_")){
			lists_names.push(key.substring(5))
		}
	}

	return getCookie(current_list_coockie_id).then(current_list => {
		return {
			lists_names: lists_names,
			current_list: current_list
		}
	});

}



// function get_all_lists(){
// 	cookies = getCookieMap()
// 	lists_names = []
// 	for (const [key, value] of Object.entries(cookies)) {
// 		console.log(`${key}: ${value}`);
// 		if(key.startsWith("list_")){
// 			lists_names.push(key.substring(5))
// 		}
// 	}

// 	$(list_select_id).empty();

// 	getCookie(current_list_coockie_id).then(current_list => {

// 		current_list_name = current_list 

// 		if(current_list_name == undefined || !lists_names.includes(current_list_name)){
// 			addOptionToSelect(list_select_id, "")
// 		}
	
		
// 		for (list of lists_names){
// 			addOptionToSelect(list_select_id, list)
// 		}

// 		if(current_list_name != undefined && lists_names.includes(current_list_name)){
// 			$(list_select_id).val(current_list_name)
// 			get_list(current_list_name)
// 		}

// 		addOptionToSelect(list_select_id, new_list_string)
// 	})
	


// }








preper();
