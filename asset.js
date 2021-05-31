// Trang nhân viên
class AssetPage {

    constructor(gridId) {
        let me = this;

        // Lưu lại grid của trang
        me.grid = $(gridId);

        // Khởi tạo các sự kiện trên trang
        me.initEvents();
    }

    /**
     * Hàm khởi tạo các sự kiện
     * Ngọc 31.05.2021
     */
    initEvents() {
        let me = this;

        // Khởi tạo sự kiện click vào row sẽ đổi background
        me.grid.on("click", "tbody tr", function() {
            me.grid.find(".selected-row").removeClass("selected-row");

            $(this).addClass("selected-row");
        });
    }

    /**
     * Hàm dùng để render dữ liệu danh sách nhân viên 
     * Ngọc 31.05.2021
     */
    loadData(data) {
        let me = this,
            table = $("<table></table>"),
            thead = me.renderHeader(),
            tbody = me.renderTbody(data);

        table.append(thead);
        table.append(tbody);

        me.grid.find("table").remove();
        me.grid.append(table);
    }

    /**
     * Hàm dùng để render header table
     * Ngọc 31.05.2021
     */
    renderHeader() {
        let me = this,
            thead = $("<thead></thead>"),
            row = $("<tr></tr>");

        // Dyệt các cột để build header
        me.grid.find(".col").each(function() {
            let text = $(this).text(),
                th = $("<th></th>");
            th.text(text);
            row.append(th);

        });

        // Thêm tr vào thead
        thead.append(row);
        return thead;
    }

    /**
     * Hàm dùng để render ra tbody
     * Ngọc 31.05.2021
     */
    renderTbody(data) {
        let me = this,
            tbody = $("<tbody></tbody>");

        if (data && data.length > 0) {
            data.filter(function(item) {
                let row = $("<tr></tr>");

                // Duyệt config từng cột
                me.grid.find(".col").each(function() {
                    let fieldName = $(this).attr("FieldName"),
                        dataType = $(this).attr("DataType"),
                        data = item[fieldName],
                        cell = $("<td></td>"),
                        className = me.getClassFormat(dataType),
                        value = me.getValue(data, dataType);
                    cell.text(value);
                    cell.addClass(className);
                    row.append(cell);
                });

                tbody.append(row);
            });
        }
        return tbody;
    }

    /**
     * Hàm render checkbox vào th vs td
     * Ngọc 31.05.2021
     */

    createTbodyCheck() {
        let inp = $('<input>');
        inp.attr('type', 'checkbox');
        $('tr td:first-child').append(inp);
    }
    createTheadCheck() {
        let inp = $('<input>');
        inp.attr('type', 'checkbox');
        $('tr th:first-child').append(inp);
    }

    /**
     * Hàm lấy class format cho từng kiểu dữ liệu
     * Ngọc 31.05.2021
     */
    getClassFormat(dataType) {
        let me = this,
            className = "";
        switch (dataType) {
            case "Number":
                className = "align-right";
                break;
            case "Date":
                className = "align-center";
                break;
            default:
                className = "align-center";
                break;
        }

        return className;
    }

    /**
     * Hàm lấy dữ liệu chuẩn hóa
     * Ngọc 31.05.2021
     */
    getValue(data, dataType) {
        let me = this;

        switch (dataType) {
            case "Number":
                data = formatMoney(data);
                break;
            case "Date":
                break;
            case "Enum":
                break;
        }

        return data;
    }
}

// Khởi tạo đối tượng trang nhân viên
let assetPage = new AssetPage("#gridAsset");

// Gọi hàm load dữ liệu grid
assetPage.loadData(assets);
assetPage.createTbodyCheck();
assetPage.createTheadCheck();


/**
 * chuyển menu lớn -> menu bé
 * Ngọc 31.05.2021
 */
$('.large-menu .home .tiny').click(function() {
    $('.large-menu').toggleClass('hide-item');
    $('.small-menu').toggleClass('hide-item');
});

/**
 * chuyển menu bé -> menu lớn
 * Ngọc 31.05.2021
 */
$('.small-menu .small').click(function() {
    $('.small-menu').toggleClass('hide-item');
    $('.large-menu').toggleClass('hide-item');
});

/**
 * Hiện sub-menu của menu bé
 * Ngọc 31.05.2021
 */
$('.road').click(function() {
    $('.road').toggleClass('lightroad');
    $('.small-menu-detail').slideToggle(1000);
});

/**
 * Hiện sub-menu của menu lớn
 * Ngọc 31.05.2021
 */
$('.large-menu .item .road1').click(function() {
    $('.large-menu .item .sub-menu').slideToggle(1000);
});


/**
 * Bấm bất kì sự kiện nào ngoài sub-menu thì sub-menu tự đóng
 * Ngọc 31.05.2021
 */
//của menu-lớn
var road1 = $('.large-menu .item .road1');
var sub = $('.large-menu .item .sub-menu');

$(document).click(function(e) {
    if (!road1.is(e.target) && road1.has(e.target).length === 0) {
        if (sub.css("display") == 'block') {
            sub.slideToggle(500);
        }
    }
});
//của menu-bé
var road = $('.road');
var submenu = $('.small-menu-detail');

$(document).click(function(e) {
    if (!road.is(e.target) && road.has(e.target).length === 0) {
        if (submenu.css("display") == 'block') {
            submenu.slideToggle(500);
        }
    }
});

/**
 * responsive nếu width<1000 thì hiện menu bé còn ko thì hiện menu lớn
 * Ngọc 31.05.2021
 */
var large = $('.large-menu');
var small = $('.small-menu');
$(window).resize(function() {
    var width = $(window).width();
    if (width <= 1000) {
        if (small.css('display') == 'none') {
            $('.large-menu').toggleClass('hide-item');
            $('.small-menu').toggleClass('hide-item');
        }
    } else {
        if (large.css('display') == 'none') {
            $('.small-menu').toggleClass('hide-item');
            $('.large-menu').toggleClass('hide-item');
        }
    }
});