/* GLOBAL VARIABLES
======================================*/	
var filterStatus = {
	reported: false,
	herd: false,
	increase: false,
	decline: false,
	reportedYes: false,
	opt1: false, //10 opt
	opt2: false, //25 opt
	opt3: false, //50 opt
	public: false,
	private: false,
	charter: false,
	showMe: 7465
}
var sortStatus = [], initSort = 9, initSortDirect = 1;

/* TABLE FUNCTIONS
======================================*/
var prettyTables = {
	data: tableData,
	dataLength: tableData.length,
	columnLength: tableData[0].length,
	init: function(){
		this.createTable();
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
					sortStatus[j] = -1; //init sorting
				}
				tr.appendChild(frag3);
				thead.appendChild(tr);
			}
			else {
				for (var j = 0 ; j < this.columnLength; j++){
					td = document.createElement('td');
					td.appendChild(document.createTextNode(this.data[i][j]));
					frag2.appendChild(td);
				}

				/* Establish Attributes for Each Row */
				tr.setAttribute('reported', this.data[i][4]);
				tr.setAttribute('herd-immunity', this.data[i][5]);
				tr.setAttribute('pbe', parseInt(this.data[i][8]));
				tr.setAttribute('type', this.data[i][1]);
				if (parseInt(this.data[i][9]) < 0){tr.setAttribute('change', 'decline');}
				else if (parseInt(this.data[i][9]) > 0){tr.setAttribute('change', 'increase');}
				else {tr.setAttribute('change', 'neither');}

				/* Address # to Show */
				if (i < filterStatus.showMe){tr.setAttribute('show-me', 'yes');}
				else {tr.setAttribute('show-me', 'no');tr.setAttribute('style', 'display:none');}

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

		/* FUNCTIONS
		---------------------------------*/
		prettyTables.defaultSort();	
	},
	defaultSort: function(){
		//default sort
		$("table").tablesorter({ 
			sortList: [[initSort,initSortDirect]] 
		}); 
		sortStatus[initSort] = initSortDirect;

		//add sort icons
		$('thead th:eq(0)').append('<i head="0" class="fa fa-sort"></i>').on('click', function(){prettyTables.sortTable(0);});
		$('thead th:eq(3)').append('<i head="3" class="fa fa-sort"></i>').on('click', function(){prettyTables.sortTable(3);});;
		$('thead th:eq(6)').append('<i head="6" class="fa fa-sort"></i>').on('click', function(){prettyTables.sortTable(6);});;
		$('thead th:eq(8)').append('<i head="8" class="fa fa-sort"></i>').on('click', function(){prettyTables.sortTable(8);});;
		$('thead th:eq(9)').append('<i head="9" class="fa fa-sort-desc"></i>').on('click', function(){prettyTables.sortTable(9);});;
	},
	resetSort: function(){
		for (var i=0 ; i < sortStatus.length ; i++){
			if (sortStatus[i] != -1){
				sortStatus[i] = -1;
			}
		}
		$('.fa-sort-asc').add('.fa-sort-desc').addClass('fa-sort').removeClass('fa-sort-desc').removeClass('fa-sort-asc');
	},
	sortTable: function(th){
		if (sortStatus[th] == -1){
			this.resetSort();
			sortStatus[th] = 0;
			$('.fa[head="'+th+'"]').remove();
			$('thead th:eq('+th+')').append('<i head="'+th+'" class="fa fa-sort-asc"></i>');
		}
		else if (sortStatus[th] == 0){
			this.resetSort();
			sortStatus[th] = 1;
			$('.fa[head="'+th+'"]').remove();
			$('thead th:eq('+th+')').append('<i head="'+th+'" class="fa fa-sort-desc"></i>');
		}
		else if (sortStatus[th] == 1){
			this.resetSort();
			sortStatus[th] = 0;
			$('.fa[head="'+th+'"]').remove();
			$('thead th:eq('+th+')').append('<i head="'+th+'" class="fa fa-sort-asc"></i>');
		}				
	}
}

/* INIT FUNCTIONS
======================================*/	
prettyTables.init();	

/* SEARCH FUNCTIONS
======================================*/	
var $rows = $("#pretty-table table tr:not(tr:eq(0))");
var allRows = document.getElementsByTagName('tr');
function searchTool(){
	var val = $.trim($('#pretty-table-search').val()).replace(/ +/g, ' ').toLowerCase();
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

$('#execute-search').on('click', function(){searchTool();});
$('#pretty-table-search').on('keypress', function(e){
	var key = e.which;
	if (key == 13){searchTool();}
})

$('#reset-search').on('click', function(){
	$('tr[show-me="yes"]').css('display','table-row');
    $('tr[show-me="no"]').css('display','none');
    $('#pretty-table-search').val('');
})

/* FILTER FUNCTIONS
======================================*/	
function resetQuestions(){
	if (filterStatus.reportedYes == true){$('.pretty-table-button[filter="5"]').click();}
	if (filterStatus.reported == true){$('.pretty-table-button[filter="6"]').click();}
	if (filterStatus.herd == true){$('.pretty-table-button[filter="7"]').click();}
	if (filterStatus.decline == true){$('.pretty-table-button[filter="8"]').click();}
	if (filterStatus.increase == true){$('.pretty-table-button[filter="9"]').click();}
}

$('.pretty-table-button').on({
	mouseenter: function(){
		var type = $(this).attr('filter');

		if (type === '0'){
			$(this).css('background','#c5f9f0');
		}
		else if (type === '1'){
			$(this).css('background','#f9f0c5');
		}			
		else if (type === '2'){
			$(this).css('background','#f0c5f9');					
		}
	},
	mouseleave: function(){
		var type = $(this).attr('filter');

		if (type === '0'){
			if (filterStatus.public == true){
				$(this).css('background','#c5f9f0');
			}
			else {
				$(this).css('background','#ddd');
			}
		}
		else if (type === '1'){
			if (filterStatus.private == true){
				$(this).css('background','#f9f0c5');
			}
			else {
				$(this).css('background','#ddd');
			}
		}
		else if (type === '2'){
			if (filterStatus.charter == true){
				$(this).css('background','#f0c5f9');
			}
			else {
				$(this).css('background','#ddd');
			}
		}
	}
});

$('.pretty-table-questions').on('click', function(){
	var filterType = $(this).attr('filter');
	switch(filterType){
		case '0':
			var theseRows = document.querySelectorAll('[type=public]');
			if (filterStatus.public == false){
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.background = '#c5f9f0';
				}
				$(this).css('background','#c5f9f0');
				filterStatus.public = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.background = '#fff';
				}
				$(this).css('background','#ddd');
				filterStatus.public = false;
			}
			break;
		case '1':
			var theseRows = document.querySelectorAll('[type=private]');
			if (filterStatus.private == false){
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.background = '#f9f0c5';
				}
				$(this).css('background','#f9f0c5');
				filterStatus.private = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.background = '#fff';
				}
				$(this).css('background','#ddd');
				filterStatus.private = false;
			}
			break;			
		case '2':
			var theseRows = document.querySelectorAll('[type=charter]');
			if (filterStatus.charter == false){
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.background = '#f0c5f9';
				}
				$(this).css('background','#f0c5f9');
				filterStatus.charter = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.background = '#fff';
				}
				$(this).css('background','#ddd');
				filterStatus.charter = false;
			}
			break;	
		case '3':
			var theseRows = document.querySelectorAll('[reported=N]');
			if (filterStatus.reportedYes == false){
				resetQuestions();
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'none';
				}
				$(this).css('background','#aaa');
				filterStatus.reportedYes = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'table-row';
				}
				$(this).css('background','#ddd');
				filterStatus.reportedYes = false;
			}
			break;
		case '4':
			var theseRows = document.querySelectorAll('[reported=Y]');
			if (filterStatus.reported == false){
				resetQuestions();
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'none';
				}
				$(this).css('background','#aaa');
				filterStatus.reported = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'table-row';
				}
				$(this).css('background','#ddd');
				filterStatus.reported = false;
			}
			break;
		case '5':
			var theseRows = document.querySelectorAll('[herd-immunity=Yes]');
			if (filterStatus.herd == false){
				resetQuestions();
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'none';
				}
				$(this).css('background','#aaa');
				filterStatus.herd = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'table-row';
				}
				$(this).css('background','#ddd');
				filterStatus.herd = false;
			}
			break;				
		case '6':
			var theseRows = document.querySelectorAll('[change=neither]');
			var theseRows2 = document.querySelectorAll('[change=increase]');
			if (filterStatus.decline == false){
				resetQuestions();
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'none';
				}
				for (var i = 0 ; i < theseRows2.length ; i++){
					theseRows2[i].style.display = 'none';
				}
				$(this).css('background','#aaa');
				filterStatus.decline = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'table-row';
				}
				for (var i = 0 ; i < theseRows2.length ; i++){
					theseRows2[i].style.display = 'table-row';
				}
				$(this).css('background','#ddd');
				filterStatus.decline = false;
			}
			break;
		case '7':
			var theseRows = document.querySelectorAll('[change=neither]');
			var theseRows2 = document.querySelectorAll('[change=decline]');
			if (filterStatus.increase == false){					
				resetQuestions();			
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'none';
				}
				for (var i = 0 ; i < theseRows2.length ; i++){
					theseRows2[i].style.display = 'none';
				}
				$(this).css('background','#aaa');
				filterStatus.increase = true;
			}
			else {
				for (var i = 0 ; i < theseRows.length ; i++){
					theseRows[i].style.display = 'table-row';
				}
				for (var i = 0 ; i < theseRows2.length ; i++){
					theseRows2[i].style.display = 'table-row';
				}
				$(this).css('background','#ddd');
				filterStatus.increase = false;
			}
			break;
	}
})