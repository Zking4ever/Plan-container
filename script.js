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

	list_holder.innerHTML += `<div class="plan theme${Math.floor(Math.random() * 6) + 1}">
					<div class="delete" onclick='deleteTask(${taskNo})'>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
							<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
						</svg>
					</div>
                    <input class="plan_title" placeholder="Title" onchange='saveChange(event,${taskNo},"title")'>
                    <textarea class="plan_text" onchange='saveChange(event,${taskNo},"content")'></textarea>
                    <div class="plan_action_btns">
                        <div class="action_btns">
							<div class='pt one' onclick='changeTaskTheme(${taskNo},1)'></div>
							<div class='pt two' onclick='changeTaskTheme(${taskNo},2)'></div>
							<div class='pt three' onclick='changeTaskTheme(${taskNo},3)'></div>
							<div class='pt four' onclick='changeTaskTheme(${taskNo},4)'></div>
							<div class='pt five' onclick='changeTaskTheme(${taskNo},5)'></div>
							<div class='pt six' onclick='changeTaskTheme(${taskNo},6)'></div>
						</div>
                        <span style='font-size:14px'>${new Date().toLocaleString()}</span>
                    </div>
                </div>`;
	taskNo++;
	saveTasks();
}
function deleteTask(i) {
	tasks.splice(i, 1);
	saveTasks();
	loadTasks();
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
	if (taskNo.length > 0) {
		list_holder.innerHTML = prepareTasks(tasks);
	} else {
		list_holder.innerHTML = `<div></div> <div class='empty'>
									<div class='placeholder'>No Task</div>
									<span>Create your first plan or note</span>
								</div>`;
	}
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
					<div class="delete" onclick='deleteTask(${index})'>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
							<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
							<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
						</svg>
					</div>
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
