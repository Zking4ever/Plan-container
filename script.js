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
	body.style.background = "linear-gradient(rgb(116 128 173 / 80%), rgb(121 122 157 ";
	body.style.color = "black";
	document.getElementsByClassName('logo')[0].style.color = "white";
	document.getElementsByTagName('Header')[0].style.backgroundColor = "rgb(0,0,0,0.5)";
	document.getElementById("date_selector").style.backgroundColor ="rgb(197, 195, 195)";
	document.getElementById("container").style.border ="solid black";
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
	body.style.background = "linear-gradient(rgb(0,0,34,0.8),rgb(7,4,78,0.8)";
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
	document.getElementById('date_input').value="";//removing for next time
}
	
 //make close posible
 
//now lets accept the todo inputs
function add_todo(){
	var li = document.createElement('Li');
	var ul = document.getElementsByClassName("list");
	ul = ul[no_of_plans];
	var name = document.getElementById("to_do_name").value;
	if(name == ""){
		alert("Enter the step first");
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
			var check = document.getElementById("check_mark");
			done[i].addEventListener('click',function (){
				check.style.display ="block";
				if(this.className =="done_task"){
					this.className ="";
					var changed = document.getElementById("changed");
					this.removeChild(changed);
					this.style.paddingRight ="0px";
			//making possible to delate task		
			var close = document.getElementsByClassName("close");
			for(var i=0; i<close.length;i++){
				close[i].addEventListener('click',function (){
					var parent = this.parentElement;
					parent.style.display ="none";
				});
			}

				}else{
					this.setAttribute('class',"done_task");
					check.id ="changed";
					this.innerHTML = this.innerHTML + check.outerHTML;
					this.style.paddingRight ="20px";
					check.id ="check_mark";
				}
				check.style.display ="none";
				});
			}
			//finialy lets remove inputs for next time
			document.getElementById("title").value ="";
			document.getElementById("textarea").value ="";
}
function styling(plan){
	plan.style.width = "300px";
	plan.style.height= "200px";
	plan.style.fontSize = "13px";
}