var focus_date = document.getElementById("focus_date_selector");
var focus_task = document.getElementById("focus_task_assign");
function add_new_task(){
    focus_date.style.display = "flex";
}
   //get all elements to work on
	var day_display = document.getElementById('day_display');
	var month_display = document.getElementById('month_display');
	var year_display = document.getElementById('year_display');
	var list_holder = document.getElementById('task_list');
		var plan = document.getElementsByClassName("plan");
		var plan_date = document.getElementsByClassName("plan_date");
		var plan_title = document.getElementsByClassName("plan_title");
		var plan_desc = document.getElementsByClassName("plan_desc");
		var plan_type = document.getElementsByClassName("plan_type");
	//get the date to assign a task
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 
function date_submited(month,day,year){
    focus_date.style.display = "none";
    focus_task.style.display ="flex";

	var date_input=document.getElementById('date_input');
	var date_taken = new Date(date_input.value);
	 year = date_taken.getFullYear();
	var month_no = date_taken.getMonth();
	 month = months[month_no];
	 day = date_taken.getDate();
	 day = day+1;


	day_display.innerHTML = day;
	month_display.innerHTML = month;
	year_display.innerHTML = year;
}
	
 //make close posible
 
//now lets accept the todo inputs
function add_todo(){
	var li = document.createElement('Li');
	var ul = document.getElementById("list");
	var name = document.getElementById("to_do_name").value;
	name = document.createTextNode(name);
	li.appendChild(name);
	var close = document.createElement('Div');
	var cross = document.createTextNode("*");
	close.appendChild(cross);
	close.className = "close";
	close.setAttribute('id','close()');
	alert(close.onclick);
	li.appendChild(close);
	if(name === ""){
		alert("Enter ToDo name first");
	}else{
		ul.appendChild(li);
	}

}
 

var no_of_plans = 0;

function set_task(event){
        event.preventDefault();
       focus_task.style.display = "none";

        //lets add a new class for every new task but in the first case it will change the default value so no need to add
        if(no_of_plans!=0){
            list_holder.innerHTML = list_holder.innerHTML + plan[0].outerHTML;
        } 

        //read all inputs of the plan
        var day = document.getElementById("day_display").innerHTML , month = document.getElementById("month_display").innerHTML, year = document.getElementById("year_display").innerHTML;
        var date = month + " " + day + ", " + year;
        var title = document.getElementById("title").value;
        var description = document.getElementById("textarea").value;

        plan_title[no_of_plans].innerHTML = "Title: " + title;
        plan_date[no_of_plans].innerHTML = date;
        plan_desc[no_of_plans].innerHTML = description;
        styling(plan[no_of_plans]);
         no_of_plans++;
        
}
function styling(plan){
	plan.style.width = "250px";
	plan.style.height= "170px";
	plan.style.fontSize = "15px";
}