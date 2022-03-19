$(document).ready(function () {

    $('.btn-navbar-toggle, .btn-navbar-toggle-opened').click(function () {
        $('body').toggleClass('sidebar-opened-mobile');
    });

    var chartBarSource = [
        {
            day: "MON",
            value: 3
        },
        {
            day: "TUE",
            value: 2
        },
        {
            day: "WED",
            value: 3
        },
        {
            day: "THU",
            value: 4
        },
        {
            day: "FRI",
            value: 6
        },
        {
            day: "SAT",
            value: 11
        },
        {
            day: "SUN",
            value: 4
        }
    ];

    // Chart 1
    $("#chart1").dxChart({
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {
                    text: arg.argumentText + "&nbsp;-&nbsp;" + arg.valueText
                };
            }
        },
        dataSource: chartBarSource,
        series: {
            argumentField: "day",
            valueField: "value",
            name: "Bar name",
            type: "bar",
            color: '#A26FE3',
            barPadding: 0.35
        },
        legend: {
            itemTextPosition: "right",
            position: "outside",
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            font: {
                color: "#75798F",
                family: "Montserrat",
                size: 14,
                weight: 400
            },
            markerSize: 10,
            orientation: "vertical",
        },
        valueAxis: {
            color: "#DADAE6",
            label: {
                font: {
                    color: "#75798F",
                    family: "Montserrat",
                    size: 12,
                    weight: 400
                }
            },
            tick: {
                color: "#DADAE6"
            }
        },
        argumentAxis: {
            color: "#DADAE6",
            label: {
                font: {
                    color: "#75798F",
                    family: "Montserrat",
                    size: 12,
                    weight: 400
                }
            },
            tick: {
                color: "#DADAE6"
            },
        }
    });

    // Chart 2
    $("#chart2").dxChart({
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {
                    text: arg.argumentText + "&nbsp;-&nbsp;" + arg.valueText
                };
            }
        },
        rotated: true,
        dataSource: chartBarSource,
        series: {
            argumentField: "day",
            valueField: "value",
            name: "Bar name",
            type: "bar",
            color: '#A26FE3',
            barPadding: 0.35
        },
        legend: {
            itemTextPosition: "right",
            position: "outside",
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            font: {
                color: "#75798F",
                family: "Montserrat",
                size: 14,
                weight: 400
            },
            markerSize: 10,
            orientation: "vertical",
        },
        valueAxis: {
            color: "#DADAE6",
            label: {
                font: {
                    color: "#75798F",
                    family: "Montserrat",
                    size: 12,
                    weight: 400
                }
            },
            tick: {
                color: "#DADAE6"
            }
        },
        argumentAxis: {
            color: "#DADAE6",
            label: {
                font: {
                    color: "#75798F",
                    family: "Montserrat",
                    size: 12,
                    weight: 400
                }
            },
            tick: {
                color: "#DADAE6"
            },
        }
    });

    var dataSource = [
        {
            product: "Super product",
            val: 35
        },
        {
            product: "Awesome product",
            val: 40
        },
        {
            product: "Just another product",
            val: 25
        }
    ];

    $("#chart3").dxPieChart({
        type: "doughnut",
        palette: ['#00E7CE', '#A26FE3', '#EEE4FB', '#a37182', '#eeba69'],
        dataSource: dataSource,
        tooltip: {
            enabled: true
        },
        legend: {
            itemTextPosition: "right",
            position: "outside",
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            font: {
                color: "#75798F",
                family: "Montserrat",
                size: 14,
                weight: 400
            },
            markerSize: 10,
            orientation: "vertical",
        },
        series: [{
            argumentField: "product"
        }]
    });

});

$(window).on('resize', function () {
    $("#chart1").dxChart("render");
    $("#chart2").dxChart("render");
    $("#chart3").dxChart("render");
});
