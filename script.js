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
	var container = document.getElementById("container");
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
	var ul = document.getElementsByClassName("list");
	ul = ul[no_of_plans];
	var name = document.getElementById("to_do_name").value;
	if(name == ""){
		alert("Enter ToDo name first");
	}else{
		var close = document.createElement('Div');
		var cross = document.createTextNode("*");
		close.appendChild(cross);
		close.addEventListener('click',function (){
			var parent = this.parentElement;
			parent.style.display ="none";
		});
		close.className = "close";
		name = document.createTextNode(name);
		li.setAttribute('title','click when finished');

		li.appendChild(name);
		li.appendChild(close);
		ul.appendChild(li);


		//now lets mark a finished task when clicked

		
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
		date = document.createTextNode(date);
        var title = document.getElementById("title").value;
        var description = document.getElementById("textarea").value;
		//here also lets read the added todo's
		var ul = document.getElementsByClassName("list");

        plan_title[no_of_plans].innerHTML = "Title: " + title;
		var span =document.getElementById('default');
		plan_date[no_of_plans].removeChild(span);
        plan_date[no_of_plans].appendChild(date);
        plan_desc[no_of_plans].innerHTML = description ;

		plan_desc[no_of_plans].innerHTML = plan_desc[no_of_plans].innerHTML + ul[no_of_plans].outerHTML;
        styling(plan[no_of_plans]);
         no_of_plans++;
		 ul[no_of_plans].innerHTML ="";
		 if(no_of_plans>2){
			container.style.paddingLeft = "100px";
		 }
        
		 var done = document.getElementsByTagName("Li");
		 for(var i=0; i<done.length; i++){
			done[i].addEventListener('click',function (){

				if(this.className =="done_task"){
					this.className ="";

				}else{
					this.setAttribute('class',"done_task");
					var check = document.getElementById("check_mark");
					
					this.appendChild(check);
				}
				});
			}
			var close = document.getElementsByClassName("close");
			for(var i=0; i<close.length;i++){
				close[i].addEventListener('click',function (){
					var parent = this.parentElement;
					parent.style.display ="none";
				});
			}
}
function styling(plan){
	plan.style.width = "400px";
	plan.style.height= "300px";
	plan.style.fontSize = "15px";
}