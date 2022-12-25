

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
	jquery_element.bind(event_type, does_need_to_add_textarea).bind(event_type, does_need_to_remove_textarea).bind(event_type, save_to_cookies);
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
			does_need_to_remove_textarea();
        }
    }

}

function render_lists(){
	return textareas.map(element => element[0].value).filter(x => x).map(JSON.parse);
}

function shuffle(){
	let invert = $('#invert_lable').is(":checked");
	let random_element = multi_random(render_lists(), invert)
	$('#value_display').html(random_element)
}

function save_to_cookies(){
	setCookie("saved_lists", JSON.stringify(render_lists()) ,7);
}

function get_from_cookies(){
	let lists = getCookie("saved_lists")
	if(lists){
		insert_data(JSON.parse(lists));
	}
}


function insert_data(lists){
	while(textareas.length > 0){
		remove_textarea()
	}
	lists.map(obj => JSON.stringify(obj, null, 2)).forEach(add_text_area);
	add_text_area();
	shuffle();
}

$('#shuffle_button').bind('click', shuffle)
$('#music_button').bind('click', () => insert_data(test_lists))




get_from_cookies()
add_text_area();
shuffle();

