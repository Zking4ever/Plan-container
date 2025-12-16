//changing the theme of the page
theme = 1; //default day mode
var change = document.getElementById("change_theme");
change.addEventListener('click', function () {
	if (theme == 1) {
		document.getElementsByTagName('body')[0].className = 'light-mode';
		theme = 0;
	} else {
		document.getElementsByTagName('body')[0].className = 'dark-mode';
		theme = 1;
	}
});



var list_holder = document.getElementById('task_list');
var tasks = []
var taskNo = tasks.length;
function saveTasks() {
	localStorage.setItem('planHubTasks', JSON.stringify(tasks));
}
function readTasks() {
	const tasksString = localStorage.getItem('planHubTasks');
	if (tasksString) {
		tasks = JSON.parse(tasksString);
		taskNo = tasks.length;
	}
}
loadTasks();

function add() {

	tasks.push({
		'id': taskNo,
		'title': '',
		'content': '',
		'tasks': [],
		'date': new Date().toLocaleString(),
		'color': 1
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

function saveChange(e, id, type) {
	tasks[id][type] = e.target.value;
	saveTasks();
	// save permanently the change
}
function changeTaskTheme(i, n) {
	tasks[i].color = n;
	var plan = document.getElementsByClassName("plan");
	plan[i].className = 'plan theme' + n;
	saveTasks();
}

function loadTasks() {
	// read from local storage for persistency
	readTasks();
	list_holder.innerHTML = prepareTasks(tasks);
	// console.log(prepareTasks(tasks))
}

function search(e) {
	const key = (e.target.value).toLowerCase();

	const matchTasks = [];
	tasks.map(t => {
		const title = String(t.title).toLowerCase();
		const content = String(t.content).toLowerCase();
		if (title.includes(key) || content.includes(key)) {
			matchTasks.push(t);
		}
	});
	if (matchTasks.length == 0) {
		list_holder.innerHTML = "<span style='color:gray'>NO ITEM FOUND</span>";
		return;
	}
	list_holder.innerHTML = prepareTasks(matchTasks);
}

function prepareTasks(list) {
	let taskStaring = '';
	list.map((task, index) => {
		taskStaring += `<div class="plan theme${task.color}">
                    <input class="plan_title" placeholder="Title" value='${task.title}' onchange='saveChange(event,${index},"title")'>
                    <textarea class="plan_text" onchange='saveChange(event,${index},"content")'>${task.content}</textarea>
                    <div class="plan_action_btns">
                        <div class="action_btns">
							<div class='pt one' onclick='changeTaskTheme(${index},1)'></div>
							<div class='pt two' onclick='changeTaskTheme(${index},2)'></div>
							<div class='pt three' onclick='changeTaskTheme(${index},3)'></div>
							<div class='pt four' onclick='changeTaskTheme(${index},4)'></div>
							<div class='pt five' onclick='changeTaskTheme(${index},5)'></div>
							<div class='pt six' onclick='changeTaskTheme(${index},6)'></div>
						</div>
                        <span style='font-size:14px'>${task.date}</span>
                    </div>
                </div>`;
	})

	return (taskStaring);
}
