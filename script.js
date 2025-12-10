//changing the theme of the page
var change = document.getElementById("change_theme");
change.addEventListener('click',function (){
	var div = document.getElementById("theme_div");
	var theme_id = div.getAttribute('data-theme-id');
	if(theme_id == 1){
		div.style.transform = "translateX(-100px)";
		div.setAttribute('data-theme-id',"0");
		day_mode();
	}else{
		div.style.transform = "translateX(0px)";
		div.setAttribute('data-theme-id',"1");
		night_mode();
	}
});
var body = document.getElementsByTagName('Body')[0];
function day_mode(){
	body.style.backgroundColor="white";
	body.style.color = "black";
	document.getElementsByClassName('logo')[0].style.color = "white";
	document.getElementsByTagName('Header')[0].style.backgroundColor = "rgb(0,0,0,0.5)";
	document.getElementById("date_selector").style.backgroundColor ="rgb(247, 238, 238)";
	document.getElementById('date').style.backgroundColor ="white";
	document.getElementById('task_contaier').style.backgroundColor ="white";
	document.getElementById("textarea").style.border ="solid black";
	document.getElementById("textarea").style.color ="black";
	document.getElementById("title").style.border ="solid black";
	document.getElementById("title").style.color ="black";
	document.getElementById("to_do_name").style.border ="solid black";
	document.getElementById("to_do_name").style.color ="black";
}
function night_mode(){
	body.style.backgroundColor = "black";
	body.style.color = "white";
	document.getElementById("date_selector").style.backgroundColor ="rgb(36, 34, 34)";
	document.getElementsByTagName('Header')[0].style.backgroundColor = "rgb(250, 250, 250,0.1) ";
	document.getElementById('date').style.backgroundColor ="rgb(10, 9, 9)";
	document.getElementById('task_contaier').style.backgroundColor ="rgb(0,0,34,0.95)";
	document.getElementById("textarea").style.border ="solid white";
	document.getElementById("textarea").style.color ="white";
	document.getElementById("title").style.border ="solid white";
	document.getElementById("title").style.color ="white";
	document.getElementById("to_do_name").style.border ="solid white";
	document.getElementById("to_do_name").style.color ="white";
}


var list_holder = document.getElementById('task_list');
var tasks = []
var taskNo = tasks.length;
function saveTasks(){
	localStorage.setItem('planHubTasks',JSON.stringify(tasks));
}
function readTasks(){
	const tasksString = localStorage.getItem('planHubTasks');
	if(tasksString){
		tasks = JSON.parse(tasksString);
		taskNo = tasks.length;
	}
}
loadTasks();

function add(){

	tasks.push({
		'id': taskNo,
		'title':'',
		'content':'',
		'tasks': [],
		'date': new Date().toLocaleString(),
		'color':1
	})

	list_holder.innerHTML += `<div class="plan theme1">
                    <input class="plan_title" placeholder="Title" onchange='saveChange(event,${taskNo},"title")'>
                    <textarea class="plan_text" onchange='saveChange(event,${taskNo},"content")'></textarea>
                    <div class="plan_action_btns">
                        <div class="action_btns">
							<div class='pt one' onclick='changeTaskTheme(${taskNo},1)'></div>
							<div class='pt two' onclick='changeTaskTheme(${taskNo},2)'></div>
							<div class='pt three' onclick='changeTaskTheme(${taskNo},3)'></div>
						</div>
                        <span style='font-size:14px'>${new Date().toLocaleString()}</span>
                    </div>
                </div>`;
	taskNo++;
	saveTasks();
}

function saveChange(e,id,type){
	tasks[id][type] = e.target.value;
	saveTasks();
	// save permanently the change
}
function changeTaskTheme(i,n){
	tasks[i].color = n;
	var plan = document.getElementsByClassName("plan");
	plan[i].className = 'plan theme'+n;
	saveTasks();
}

function loadTasks(){
	// read from local storage for persistency
	readTasks();
	list_holder.innerHTML = prepareTasks();
}

function prepareTasks(){
	return tasks.map((task,index)=>{
		return (
			`<div class="plan theme${task.color}">
                    <input class="plan_title" placeholder="Title" value='${task.title}' onchange='saveChange(event,${index},"title")'>
                    <textarea class="plan_text" onchange='saveChange(event,${index},"content")'>${task.content}</textarea>
                    <div class="plan_action_btns">
                        <div class="action_btns">
							<div class='pt one' onclick='changeTaskTheme(${index},1)'></div>
							<div class='pt two' onclick='changeTaskTheme(${index},2)'></div>
							<div class='pt three' onclick='changeTaskTheme(${index},3)'></div>
						</div>
                        <span style='font-size:14px'>${task.date}</span>
                    </div>
                </div>`
		)
	})
}