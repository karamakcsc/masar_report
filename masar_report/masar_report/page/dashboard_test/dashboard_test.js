frappe.pages['dashboard-test'].on_page_load = function(wrapper) {
  new MyPage(wrapper);
}
// page content
MyPage = Class.extend({
	init: function(wrapper){
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'DashBoard Test',
			single_column: true
		});
		// make page
		this.make();

	},

	//make pages
	make: function(){
		// grap the class
			let me = $(this);

			// curruncy format
			let currency = function currency(n){
				let money = new Intl.NumberFormat('en-NG',
				 {style: 'currency', currency: 'JOD'}).format(n);
				return money
			}
			// refresh balance


			// get balance
			let balance = function(){
				frappe.call({
							method: "masar_report.masar_report.page.dashboard_test.dashboard_test.get_balance", //dotted path to server method
							callback: function(r) {
									// code snippet
									console.log(r);
									//set get_balance
									$("#total-balance")[0].innerText = currency(r.message);
							}
						})
			}
			// chart callback
			let balance_chart = function(){
				frappe.call({
							method: "masar_report.masar_report.page.dashboard_test.dashboard_test.get_balance_chart", //dotted path to server method
							callback: function(r) {
									// code snippet
									console.log(r);
									// let balance_tuple = ()
									let balances = []
									let totals = []
									let message = r.message
									message.forEach((item) => {
										balances.push(item[0]);
										totals.push(item[1]);
										// balance_tuplepush(item[1])
									});;
									// console.log(balances, totals )
									//start chart
									let chart = new frappe.Chart( "#frost-chart", { // or DOM element
									data: {
									labels: balances,

									datasets: [
										{
											name: balances[0], chartType: 'bar',
											values: totals
										}
										// {
										// 	name: balances[1], chartType: 'bar',
										// 	values: [totals[1]]
										// },
										// {
										// 	name: balances[2], chartType: 'bar',
										// 	values: [totals[2]]
										// },
										// {
										// 	name: balances[3], chartType: 'bar',
										// 	values: [totals[3]]
										// },
										// {
										// 	name: balances[4], chartType: 'bar',
										// 	values: [totals[4]]
										// },
										// {
										// 	name: balances[5], chartType: 'bar',
										// 	values: [totals[5]]
										// }
									],

									yMarkers: [{ label: "Marker", value: 200,
										options: { labelPos: 'left' }}],
									yRegions: [{ label: "Region", start: Math.min(totals[0]), end: Math.min(totals[0]),
										options: { labelPos: 'right' }}]
									},

									title: "Blance of Current Asset",
									type: 'bar', // or 'bar', 'line', 'pie', 'percentage'
									height: 400,
									colors: ['purple', 'red', 'light-blue'],

									tooltipOptions: {
										formatTooltipX: d => (d + '').toUpperCase(),
										formatTooltipY: d => d + ' JOD',
									}
								  });
									console.log('ready')
									// alert('ready')
									//end chart

							}
						})
			}

			//chart
			//let page_chart = function(){
				// let chart = new frappe.Chart( "#frost-chart", { // or DOM element
				// data: {
				// labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
				// 	"12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],
				//
				// datasets: [
				// 	{
				// 		name: "Some Data", chartType: 'bar',
				// 		values: [25, 40, 30, 35, 8, 52, 17, -4]
				// 	},
				// 	{
				// 		name: "Another Set", chartType: 'bar',
				// 		values: [25, 50, -10, 15, 18, 32, 27, 14]
				// 	},
				// 	{
				// 		name: "Yet Another", chartType: 'line',
				// 		values: [15, 20, -3, -15, 58, 12, -17, 37]
				// 	}
				// ],
				//
				// yMarkers: [{ label: "Marker", value: 70,
				// 	options: { labelPos: 'left' }}],
				// yRegions: [{ label: "Region", start: -10, end: 50,
				// 	options: { labelPos: 'right' }}]
				// },
				//
				// title: "Blance of Current Asset",
				// type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
				// height: 300,
				// colors: ['purple', '#ffa3ef', 'light-blue'],
				//
				// tooltipOptions: {
				// 	formatTooltipX: d => (d + '').toUpperCase(),
				// 	formatTooltipY: d => d + ' pts',
				// }
			  // });

			// }

			//push dom elemt to page
			$(frappe.render_template(frappe.masar_report_page.body, this)).appendTo(this.page.main)

			// excute methods
			balance();
			//page_chart();
			balance_chart();
			// refresh balance
			document.querySelector("#refresh-balance").addEventListener('click',()=>{
			console.log("Refresh clicked")
			balance();
		})


	}
	// end of class
})

// HTML content
let body = `
								<div class="widget-group ">
												<div class="widget-group-head">

													<div class="widget-group-control"></div>
												</div>
												<div class="widget-group-body grid-col-3"><div class="widget         widget-shadow    number-widget-box" data-widget-name="Total Declaration Submitted">
											<div class="widget-head">
												<div>
													<div class="widget-title ellipsis"><div class="number-label text-danger">Blance of Current Asset</div></div>
													<div class="widget-subtitle"></div>
												</div>
												<div class="widget-control"><div class="card-actions dropdown pull-right">
												<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												...
												</a>
												<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
													<li class="dropdown-item">
																	<a data-action="action-refresh" id="refresh-balance">Refresh</a>

																</li>
												</ul>
											</div></div>
											</div>
											<div class="widget-body"><div class="widget-content">
												<div class="number" style="color:undefined" id="total-balance">
												0000000
												</div>
												</div></div>
										    <div class="widget-footer">
										    </div>
										</div>
											</div>

											<br>

											<div id="frost-chart"></div>


`;
// frappe.masar_report_page = {}
frappe.masar_report_page = {
	body: body
}
