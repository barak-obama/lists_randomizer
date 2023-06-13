let textareas = [];
const textarea_id = "list_input_"
let current_id = 0;
let list_container;
const event_type = "input";
const list_select_id = "#list_select"
const new_list_string = "Create New List"

function add_text_area(text=""){
	textarea = document.createElement('textarea');
	textarea.id = textarea_id + current_id;
	current_id++;
	jquery_element = $(textarea);
	if (text.charAt(0) === '"' && text.charAt(text.length -1) === '"')
	{
    		text = text.substr(1,text.length -2);
	}
	jquery_element.val(text.replaceAll('\\n', '\n').replaceAll('\\\"', '\"'));
	jquery_element.bind(event_type, does_need_to_add_textarea).bind(event_type, does_need_to_remove_textarea).bind(event_type, () => save_current_list(current_list_name));
	textareas.push(jquery_element);
	list_container.appendChild(textarea);

	jquery_element.toggleClass('list')
	return jquery_element;
}

function remove_list(){
	while(textareas.length > 0){
		remove_textarea()
	}
	add_text_area();
	shuffle();
	
	current_option = $("[value='" + current_list_name + "']")
	new_list = current_option.prev().attr("value");

	$(list_select_id).val(new_list)

	current_option.remove()
	remove_current_list(current_list_name);
	list_choose()
}



function insert_data(lists){
	while(textareas.length > 0){
		remove_textarea()
	}
	lists.map(obj => JSON.stringify(obj, null, 2)).forEach(add_text_area);
	add_text_area();
	shuffle();
}

function remove_textarea(){
	if(textareas.length == 0)
		return;
	textarea = last_element_value = textareas.pop()[0]
	current_id--;
	list_container.removeChild(textarea);

}

function does_need_to_add_textarea(){
	last_element_value = textareas[textareas.length - 1][0].value;
	console.log(last_element_value)
	if(last_element_value != ""){
		add_text_area();
	}


}

function does_need_to_remove_textarea(){

	if(textareas.length > 1){
		last_element_value = textareas[textareas.length - 1][0].value;
		before_last_element_value = textareas[textareas.length - 2][0].value;
		if(last_element_value == "" && before_last_element_value == ""){
			remove_textarea();
			does_need_to_remove_textarea();
        	}
	}
}


function render_lists(){
	return new Promise((resolve, reject) => {
		a = textareas.map(element => element[0].value).filter(x => x).map(val => {
			try {
        			return JSON.parse(val);
    			} catch (e) {
        			reject();
    			}
		});
		resolve(a);
	});
}

function list_choose(){
	let new_list = $(list_select_id).val();
	if(new_list == new_list_string){
		create_new_list()
		return;
	}
	change_list(new_list)
}



function refresh_select(){
	get_all_lists().then(info => {

		$(list_select_id).empty();

		if(info.current_list == undefined || !info.lists_names.includes(info.current_list)){
			addOptionToSelect(list_select_id, "")
		}
	
		
		for (list of info.lists_names){
			addOptionToSelect(list_select_id, list)
		}

		if(info.current_list != undefined && info.lists_names.includes(info.current_list)){
			$(list_select_id).val(info.current_list)
			get_list(info.current_list)
		}

		addOptionToSelect(list_select_id, new_list_string)
	});
}



function preper(){
	list_container = document.getElementById('lists_container')
	$('#shuffle_button').bind('click', shuffle)
	$("#remove_list_button").bind('click', remove_list)
	// $(list_select_id).bind('change', () => insert_data(test_lists))
	$(list_select_id).on('change', list_choose)
	get_list(getCookie(current_list_coockie_id))
	add_text_area();

    if(!lists_names.includes(music_list_name)){
        save_list(music_list_name, test_lists)
    }

    refresh_select();
	shuffle();
    
}