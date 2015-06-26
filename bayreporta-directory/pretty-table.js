
/* TABLE FUNCTIONS
======================================*/
var prettyTables = {
	data: [],
	dataLength: 0,
	columnLength:0,
	questions:{
		live:false,
		news:false,
		notNews:false
	},
	init: function(){
		jQuery.getJSON('../wp-content/themes/centauri/data/directory.json', function (d) {
			 prettyTables.data = d;
			 prettyTables.dataLength = d.length;
			 prettyTables.columnLength = d[0].length;
			 prettyTables.createTable();
		});
	},
	createTable: function(){
		var contain, table, td, tr, th;
		var frag = document.createDocumentFragment();
		var frag2 = document.createDocumentFragment();
		var frag3 = document.createDocumentFragment();

		contain = document.getElementById('pretty-table');
		table = document.createElement('table');
		thead = document.createElement('thead');
		tbody = document.createElement('tbody');

		/* ROWS
		---------------------------------*/
		for (var i = 0; i < this.dataLength; i++){
			tr = document.createElement('tr');
			if (i == 0){
				for (var j = 0 ; j < this.columnLength; j++){
					th = document.createElement('th');
					th.appendChild(document.createTextNode(this.data[0][j]));
					frag3.appendChild(th);
					//sortStatus[j] = -1; //init sorting
				}
				tr.appendChild(frag3);
				thead.appendChild(tr);
			}
			else {
				for (var j = 0 ; j < this.columnLength; j++){
					td = document.createElement('td');
					if (j == 0){
						a = document.createElement('a');
						a.appendChild(document.createTextNode(this.data[i][j]));
						td.appendChild(a);
					}
					else {
						td.appendChild(document.createTextNode(this.data[i][j]));
					}
					frag2.appendChild(td);
				}

				/* Append Row */
				tr.appendChild(frag2);
				frag.appendChild(tr);
			}
		}

		/* TABLE
		---------------------------------*/
		table.appendChild(thead);
		tbody.appendChild(frag);
		table.appendChild(tbody);
		contain.appendChild(table);

		/* LINKS
		---------------------------------*/
		for (var i=0 ; i < this.dataLength ; i++){
			jQuery('tr:eq('+i+') a').attr('href',this.data[i][5]);
		}		

		/* APPLY FILTERS
		---------------------------------*/
		for (var i = 0 ; i < this.dataLength; i++){
			var thisRow = jQuery('tr:eq('+i+')');
			var live = jQuery('tr:eq('+i+') td:eq(1)').text();
			var news = jQuery('tr:eq('+i+') td:eq(6)').text();

			//live filter check
			if (live === 'Live'){
				thisRow.attr('live', 'y');
			}

			//news game check
			if (news === "TRUE"){
				thisRow.attr('news', 'y');
			}
			else {
				thisRow.attr('news', 'n');
			}
		}

		/* FUNCTIONS
		---------------------------------*/
		prettyTables.applyQuestions(prettyTables.questions);
		//prettyTables.defaultSort();	
	},
	resetQuestions:function(q){
		q.live = false, q.news = false, q.notNews = false;
	},
	applyQuestions:function(q){
		jQuery('.pretty-table-questions').on('click', function(){
			var question = jQuery(this).attr('filter');

			//GET AND RESET ALL ROWS AND SEARCH
			var allRows =  jQuery('tbody tr');
			for (var i = 0 ; i < allRows.length ; i++){
				allRows[i].style.display = "none";
			}
			jQuery('#pretty-table-search').val('');

			switch(question){
				case '0':
					var theseRows = document.querySelectorAll('[live=y]');
					if (q.live == false){
						for (var i=0 ; i < theseRows.length ; i++){
							theseRows[i].style.display = "table-row";
				    	}
				    	jQuery('.pretty-table-questions').css('background','#ddd');
				    	jQuery(this).css('background','#aaa');
				    	prettyTables.resetQuestions(q);
						q.live = true;
					}
					else {
						for (var i = 0 ; i < allRows.length ; i++){
							allRows[i].style.display = "table-row";
						}
						jQuery('.pretty-table-questions').css('background','#ddd');
						q.live = false;
					}
					break;
				case '1':		
					var theseRows = document.querySelectorAll('[news=y]');
					if (q.news == false){
						for (var i=0 ; i < theseRows.length ; i++){
							theseRows[i].style.display = "table-row";
				    	}
				    	jQuery('.pretty-table-questions').css('background','#ddd');
				    	jQuery(this).css('background','#aaa');
				    	prettyTables.resetQuestions(q);
						q.news = true;
					}
					else {
						for (var i = 0 ; i < allRows.length ; i++){
							allRows[i].style.display = "table-row";
						}
						jQuery('.pretty-table-questions').css('background','#ddd');
						q.news = false;
					}			
					break;
				case '2':
					var theseRows = document.querySelectorAll('[news=n]');
					if (q.notNews == false){
						for (var i=0 ; i < theseRows.length ; i++){
							theseRows[i].style.display = "table-row";
				    	}
				    	jQuery('.pretty-table-questions').css('background','#ddd');
				    	jQuery(this).css('background','#aaa');
				    	prettyTables.resetQuestions(q);
						q.notNews = true;
					}
					else {
						for (var i = 0 ; i < allRows.length ; i++){
							allRows[i].style.display = "table-row";
						}
						jQuery('.pretty-table-questions').css('background','#ddd');
						q.notNews = false;
					}
					break;
			}
		})
	},
}


/* INIT FUNCTIONS
======================================*/	
prettyTables.init();	


/* SORT FUNCTIONS
======================================*/
window.onload = function(){
	jQuery('#pretty-table table').tablesorter({
		sortList: [[0,0]]
	});
}

/* SEARCH FUNCTIONS
======================================*/	
var jQueryrows = jQuery("#pretty-table table tr:not(tr:eq(0))");
var allRows = document.getElementsByTagName('tr');
function searchTool(){
	var val = jQuery.trim(jQuery('#pretty-table-search').val()).replace(/ +/g, ' ').toLowerCase();
    if (val === ''){
    	var showMe = document.querySelectorAll('[show-me=yes]');
    }
    else if (val !== '') {
    	 for (var i=1 ; i < allRows.length ; i++){
    	 	allRows[i].style.display = "table-row";

    	 	var testText = allRows[i].textContent;
    		testText = testText.replace(/\s+/g, ' ').toLowerCase();
			if (testText.indexOf(val) == -1){
				allRows[i].style.display = "none";
			}
    	 }
    }
}		

jQuery('#execute-search').on('click', function(){searchTool();});
jQuery('#pretty-table-search').on('keypress', function(e){
	var key = e.which;
	if (key == 13){searchTool();}
})

jQuery('#reset-search').on('click', function(){
	jQuery('tr').css('display','table-row');
    jQuery('#pretty-table-search').val('');
})


