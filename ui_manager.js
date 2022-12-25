

let textareas = [];
const textarea_id = "list_input_"
let current_id = 0;
let list_container=document.getElementById('lists_container');
const event_type = "input";

function add_text_area(text=""){
	
	
	textarea = document.createElement('textarea');
	textarea.id = textarea_id + current_id;
	current_id++;
	jquery_element = $(textarea);
	jquery_element.html(text);
	jquery_element.bind(event_type, does_need_to_add_textarea).bind(event_type, does_need_to_remove_textarea);
	textareas.push(jquery_element);
	list_container.appendChild(textarea);

	jquery_element.toggleClass('list')
	return jquery_element;
}

function remove_textarea(){
	if(textareas.length == 0)
		return;
	textarea = last_element_value = textareas.pop()[0]
	current_id--;
	list_container.removeChild(textarea);

}

function preper(){
	list_container = document.getElementById('list	_container')
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
        	}
        }

}

function shuffle(){
	lists = [];
	let random_element = multi_random(textareas.map(element => element[0].value).filter(x => x).map(JSON.parse))
	$('#value_display').html(random_element)
}


function insert_data(lists){
 while(textareas.length > 0){
	remove_textarea()
}

lists.map(obj => JSON.stringify(obj, null, 2)).forEach(add_text_area);


}

$('#shuffle_button').bind('click', shuffle)

insert_data(test_lists);
add_text_area();
shuffle();

