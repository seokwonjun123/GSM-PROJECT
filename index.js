//이번 주 구하기
var nowDate = new Date();
var theYear = nowDate.getFullYear();
var theMonth = nowDate.getMonth();
var theDate = nowDate.getDate();
var theDayOfWeek = nowDate.getDay();

var thisWeek = [];
var thisYear;
var thisMonth;

function getWeeK() {
	for (var i = 0; i < 7; i++) {
		var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
		var yyyy = resultDay.getFullYear();
		var mm = Number(resultDay.getMonth()) + 1;
		var dd = resultDay.getDate();

		mm = String(mm).length === 1 ? "0" + mm : mm;
		dd = String(dd).length === 1 ? "0" + dd : dd;

		thisWeek[i] = Number(dd);
		thisYear = yyyy;
		thisMonth = mm;
	}
	// console.log(thisWeek);
}

function getWeekOfMonth(date){
	var selectedDayOfMonth = date.getDate();
	
	var first = new Date(date.getFullYear()+ '/' + (date.getMonth() +1)+'/01');
	var monthFirstDateDay = first.getDay();

	return Math.ceil((selectedDayOfMonth + monthFirstDateDay) / 7);
}
(function () {
	calendarMaker($("#calendarForm"), new Date());
})();

var nowDate = new Date();
function calendarMaker(target, date) {
	if (date == null || date == undefined) {
		date = new Date();
	}
	nowDate = date;
	if ($(target).length > 0) {
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1;
		var week = getWeekOfMonth(nowDate);
		$(target).empty().append(assembly(year, month, week));
	} else {
		console.error("custom_calendar Target is empty!!!");
		return;
	}

	var tag = "<tr>";
	var cnt = 0;

	getWeeK();

	for (i = 0; i < 7; i++) {
		tag += "<td>" + thisWeek[i] + "</td>";
		cnt++;
	}

	$(target).find("#custom_set_date").append(tag);
	calMoveEvtFn();

	function assembly(year, month,week) {
		var calendar_html_code =
			"<table class='custom_calendar_table'>" +
			"<colgroup>" +
			"<col style='width:81px'/>" +
			"<col style='width:81px'/>" +
			"<col style='width:81px'/>" +
			"<col style='width:81px'/>" +
			"<col style='width:81px'/>" +
			"<col style='width:81px'/>" +
			"<col style='width:81px'/>" +
			"</colgroup>" +
			"<thead class='cal_date'>" +
			"<th><button type='button' class='prev'><</button></th>" +
			"<th colspan='5'><p><span>" +
			month+
			"</span>월 <span>" +
			week +
			"</span>주차 </p></th>" +
			"<th><button type='button' class='next'>></button></th>" +
			"</thead>" +
			"<thead  class='cal_week'>" +
			"</thead>" +
			"<tbody id='custom_set_date'>" +
			"</tbody>" +
			"</table>";
		return calendar_html_code;
	}

	function calMoveEvtFn() {
		//전달 클릭
		$(".custom_calendar_table").on("click", ".prev", function () {
			nowDate = new Date(nowDate.setDate(nowDate.getDate() - 7));
			theDate -= 7;
			calendarMaker($(target), nowDate);
		});
		//다음날 클릭
		$(".custom_calendar_table").on("click", ".next", function () {
			nowDate = new Date(nowDate.setDate(nowDate.getDate() + 7));
			theDate += 7;
			calendarMaker($(target), nowDate);
		});
		//일자 선택 클릭
		$(".custom_calendar_table").on("click", "td", function () {
			$(".custom_calendar_table .select_day").removeClass("select_day");
			$(this).removeClass("select_day").addClass("select_day");
		});
	}
}
