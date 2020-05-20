function calculate() {
    var answers = {},
        thousandSeparator = ".",
        unit = "<span class='unit'>kr.</span>",
        valid = true,
        errorMode = 0, //1 = show only 1 error at a time, 0 = show all errors
        warning = {
            missing1: "Vennligst inntast opplysninger",
            missing2: "Vennligst velg"
        };
    //========================================================================
    // GET VALUES OF ALL INPUTS
    //========================================================================
    answers["mode"] = $("#mode-select").val();
    $("#input input, #input select").each(function () {
        var id = $(this).attr("id");
        if ($(this).is("[type=checkbox]")) {
            answers[id] = $("#" + id).prop("checked");
        } else {
            var IdValue = reverseNumber($("#" + id).val());
            answers[id] = IdValue ? parseFloat(IdValue).toFixed(3) : ($(this).is("select") ? null : 0);
        }
    });

        //========================================================================

    var testnum = 123456789123.789;
    var xyz = FormatterUnit(testnum);    


    // set constants
    var ABS_1 = 1656.418779;
    var ABS_2 = 2534.305522;
    var ABS_3 = 745.9803873;
    var ABS_4 = 594.6831375;
    var ABS_5 = 268.9524326;
    var ABS_6 = 339.138554;
    var ABS_7 = 335.467128;
    var ABS_8 = 0;

        // Add pptx
    // result 1
    var TempResult1_1 = +answers["ABS1_1"] * 0.01 * +answers["ATT1"];
    var TempResult2_1 = +answers["ABS2_1"] * 0.01 * +answers["ATT1"];
    var TempResult3_1 = +answers["ABS3_1"] * 0.01 * +answers["ATT1"];
    var TempResult4_1 = +answers["ABS4_1"] * 0.01 * +answers["ATT1"];
    var TempResult5_1 = +answers["ABS5_1"] * 0.01 * +answers["ATT1"];
    var TempResult6_1 = +answers["ABS6_1"] * 0.01 * +answers["ATT1"];
    var TempResult7_1 = +answers["ABS7_1"] * 0.01 * +answers["ATT1"];
    var TempResult8_1 = +answers["ABS8_1"] * 0.01 * +answers["ATT1"];

    // result 2
    var TempResult1_2 = TempResult1_1 * (ABS_1 * +answers["ABS1_2"] * (+answers["ABS1_3"] * 0.01));
    var TempResult2_2 = TempResult2_1 * (ABS_2 * +answers["ABS2_2"] * (+answers["ABS2_3"] * 0.01));
    var TempResult3_2 = TempResult3_1 * (ABS_3 * +answers["ABS3_2"] * (+answers["ABS3_3"] * 0.01));
    var TempResult4_2 = TempResult4_1 * (ABS_4 * +answers["ABS4_2"] * (+answers["ABS4_3"] * 0.01));
    var TempResult5_2 = TempResult5_1 * (ABS_5 * +answers["ABS5_2"] * (+answers["ABS5_3"] * 0.01));
    var TempResult6_2 = TempResult6_1 * (ABS_6 * +answers["ABS6_2"] * (+answers["ABS6_3"] * 0.01));
    var TempResult7_2 = TempResult7_1 * (ABS_7 * +answers["ABS7_2"] * (+answers["ABS7_3"] * 0.01));
    var TempResult8_2 = TempResult8_1 * (ABS_8 * +answers["ABS8_2"] * (+answers["ABS8_3"] * 0.01));

    // result 3
    var TempResult9_1 = TempResult1_2 + TempResult2_2 + TempResult3_2 + TempResult4_2 + TempResult5_2
        + TempResult6_2 + TempResult7_2 + TempResult8_2;

    // result 4
    var TempResult_ATT_1 = +answers["ATT9"] + +answers["ATT8"] + +answers["ATT7"] + +answers["ATT6"] + +answers["ATT5"];

    // result 5 -- E44
    var TempResult_ATT_2 = +answers["ATT10"] + +answers["ATT11"] + +answers["ATT12"] + +answers["ATT13"] + +answers["ATT14"]
        + +answers["ATT15"] + +answers["ATT16"];
    var TempResult_ATT_2_ToFixed = FormatterUnit(TempResult_ATT_2);
    $("#E44").text(TempResult_ATT_2_ToFixed + " kr.");
    
    // result 6 - E56
    var TempResult_ATT_3 = +answers["ATT17"] + +answers["ATT18"] + +answers["ATT19"] + +answers["ATT20"] + +answers["ATT21"]
        + +answers["ATT22"] + +answers["ATT23"] + +answers["ATT24"] + +answers["ATT25"];
    var TempResult_ATT_3_ToFixed = FormatterUnit(TempResult_ATT_3);
    $("#E56").text(TempResult_ATT_3_ToFixed +" kr.");

    // result 7
    var TempResult_ATT_4 = TempResult_ATT_2 - TempResult_ATT_3;

    // result 8 - E63
    var TempResult_UDRE_1 = +answers["ATT1"] + +answers["ATT2"];
    var TempResult_UDRE_1_ToFixed = FormatterUnit(TempResult_UDRE_1);
    $("#E63").text(TempResult_UDRE_1_ToFixed);

    // result 9 -- E64
    var TempResult_UDRE_2 = RoundNumber(TempResult1_1 + TempResult2_1 + TempResult3_1 + TempResult4_1 + TempResult5_1
        + TempResult6_1 + TempResult7_1);
    var TempResult_UDRE_2_ToFixed = FormatterUnit(TempResult_UDRE_2);
    $("#E64").text(TempResult_UDRE_2_ToFixed);

    // result 10
    var TempResult_UDRE_3 = TempResult8_1 + +answers["ATT2"];

    // result 11
    var TempResult_UDRE_4 = +answers["ATT2"];

    // result 12 -- E68
    var ABS1_3_M_TempResult1_1 = +answers["ABS1_3"] * TempResult1_1;
    var ABS2_3_M_TempResult2_1 = +answers["ABS2_3"] * TempResult2_1;
    var ABS3_3_M_TempResult3_1 = +answers["ABS3_3"] * TempResult3_1;
    var ABS4_3_M_TempResult4_1 = +answers["ABS4_3"] * TempResult4_1;
    var ABS5_3_M_TempResult5_1 = +answers["ABS5_3"] * TempResult5_1;

    //var TempResult_UDRE_5 = RoundNumber(ABS1_3_M_TempResult1_1 + ABS2_3_M_TempResult2_1 + ABS3_3_M_TempResult3_1
    //    + ABS4_3_M_TempResult4_1 + ABS5_3_M_TempResult5_1);
    //$("#E68").text(format(TempResult_UDRE_5.toFixed(2), 0));

    // result 13
    //var TempResult_UDRE_6 = RoundNumber(ABS1_3_M_TempResult1_1 + ABS3_3_M_TempResult3_1 + ABS5_3_M_TempResult5_1);
    var TempResult_UDRE_6 = RoundNumber(ABS1_3_M_TempResult1_1 + ABS2_3_M_TempResult2_1 + ABS3_3_M_TempResult3_1);

    // result 14
    //var TempResult_UDRE_7 = RoundNumber(ABS2_3_M_TempResult2_1 + ABS4_3_M_TempResult4_1);
    var TempResult_UDRE_7 = RoundNumber(ABS4_3_M_TempResult4_1 + ABS5_3_M_TempResult5_1);

    var TempResult_UDRE_5 = RoundNumber(ABS1_3_M_TempResult1_1 + ABS2_3_M_TempResult2_1 + ABS3_3_M_TempResult3_1 + ABS4_3_M_TempResult4_1 + ABS5_3_M_TempResult5_1);
    var TempResult_UDRE_5_ToFixed = FormatterUnit(TempResult_UDRE_5);
    $("#E68").text(TempResult_UDRE_5_ToFixed);

    // result 15 -- E72
    //var TempResult_UDRE_8 = RoundNumber(TempResult9_1 - TempResult_ATT_1 + +answers["ATT4"] + +answers["ATT26"] + TempResult_ATT_4);
    //var TempResult_UDRE_8_ToFixed = FormatterUnit(TempResult_UDRE_8);
    //$("#E72").text(TempResult_UDRE_8_ToFixed + " Kr.");

    // result 16 -- E73
    var TempResult_UDRE_9 = RoundNumber(TempResult_ATT_4 + +answers["ATT4"] + +answers["ATT26"]);
    var TempResult_UDRE_9_ToFixed = FormatterUnit(TempResult_UDRE_9);
    $("#E73").text(TempResult_UDRE_9_ToFixed +" kr.");

    // result 17 - E74
    var TempResult_UDRE_10 = RoundNumber(TempResult9_1 - TempResult_ATT_1);
    var TempResult_UDRE_10_ToFixed = FormatterUnit(TempResult_UDRE_10);
    $("#E74").text(TempResult_UDRE_10_ToFixed +" kr.");

    var TempResult_UDRE_8 = RoundNumber(TempResult_ATT_4 + +answers["ATT4"] + +answers["ATT26"] + (TempResult9_1 - TempResult_ATT_1));
    var TempResult_UDRE_8_ToFixed = FormatterUnit(TempResult_UDRE_8);
    $("#E72").text(TempResult_UDRE_8_ToFixed + " kr.");

    // result 19 - E76
    var TempResult_UDRE_12 = +answers["ATT3"];
    var TempResult_UDRE_12_ToFixed = FormatterUnit(TempResult_UDRE_12);
    $("#E76").text(TempResult_UDRE_12_ToFixed);

    // result 20
    var TempResult_UDRE_13 = TempResult_UDRE_10 * 0.87 * 0.000001;

    // result 18 - E77
    var TempResult_UDRE_11 = TempResult_UDRE_12 + TempResult_UDRE_13;
    var TempResult_UDRE_11_ToFixed = FormatterUnit(TempResult_UDRE_11);
    $("#E77").text(TempResult_UDRE_11_ToFixed);

    // result 22
    var TempResult_UDRE_15 = RoundNumber(TempResult_ATT_4);

    // result 23 -- E83
    var TempResult_UDRE_16 = RoundNumber(TempResult_UDRE_10 * 0.25 + TempResult_UDRE_10 * 0.11);
    var TempResult_UDRE_16_ToFixed = FormatterUnit(TempResult_UDRE_16);
    $("#E83").text(TempResult_UDRE_16_ToFixed +" kr.");

    // result 21 -- E81
    //var TempResult_UDRE_14 = RoundNumber(TempResult_UDRE_15 + TempResult_UDRE_16);
    var TempResult_UDRE_14 = RoundNumber(TempResult_ATT_4 + ((TempResult9_1 - TempResult_ATT_1) * 0.25 + (TempResult9_1 - TempResult_ATT_1) * 0.11));
    var TempResult_UDRE_14_ToFixed = FormatterUnit(TempResult_UDRE_14);
    $("#E81").text(TempResult_UDRE_14_ToFixed + " kr.");

        // End Add pptx
        //========================================================================

    //========================================================================
    // OTHER FUNCTIONS
    //========================================================================
    function showError(input, message) {
        //if ((valid && errorMode) || !errorMode) {
        //    if (message) {
        //        var td = input.closest("td"),
        //            error = $("<div class='input-error'>" + message + "</div>").css({
        //                "top": input.offset().top - td.offset().top,
        //                "left": input.offset().left - td.offset().left + input.width() + 15
        //            }).insertAfter(input);
        //    }
        //    input.addClass("red-border");
        //    input.on("change.confirmChange", function () {
        //        if (error) error.remove();
        //        input.removeClass("red-border");
        //        input.off("change.confirmChange");
        //    });
        //    valid = false;
        //}
    }

    function format(n, decimal) {
        var factor = Math.pow(10, decimal),
            result = (Math.round(n * factor) / factor).toString().replace(".", thousandSeparator == "." ? "," : ".");

        while (true) {
            var temp = result.replace(/(\d+)(\d{3})/g, "$1" + thousandSeparator + "$2");
            if (result == temp) break;
            result = temp;
        }
        return result;
    }

    function reverseNumber(value) {
        value = value.split('.').join("");
        value = value.replace(/,/g, '.');
        return value;
    }

    function FormatterUnit(num) {
        var result;

        if (Math.abs(num) > 999 && Math.abs(num) < 1000000) {
            result = format(Math.sign(num) * ((Math.abs(num) / 1000).toFixed(0)), 0) + ' tusinde';;
        }
        else if (Math.abs(num) > 999999) {
            result = format(Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(0)), 0) + ' mio';
        } else {
            result = format(Math.sign(num) * Math.abs(num), 0);
        }

        return result;
    }

    function RoundNumber(num) {
        var resultRoundNumber = 0;

        if (num >= 10000 && num < 99999) {
            resultRoundNumber = Number(Math.round(num / 10000 + 'e1') + 'e-1') * 10000;
        } else if (num >= 100000 && num < 999999) {
            //resultRoundNumber = Number(Math.round(num / 100000 + 'e1') + 'e-1') * 100000;
            resultRoundNumber = Number(Math.round(num / 100000 + 'e2') + 'e-2') * 100000;
        } else if (num >= 1000000 && num < 9999999) {
            resultRoundNumber = Number(Math.round(num / 1000000)) * 1000000;
        } else if (num >= 10000000) {
            resultRoundNumber = Number(Math.round(num / 10000000 + 'e1') + 'e-1') * 10000000;
        } else {
            resultRoundNumber = num;
        }

        return resultRoundNumber;
    }

    return valid;
}

function calculateTempResult() {
    var answers = {},
        thousandSeparator = ".",
        unit = "<span class='unit'>kr.</span>",
        valid = true,
        errorMode = 0, //1 = show only 1 error at a time, 0 = show all errors
        warning = {
            missing1: "Vennligst inntast opplysninger",
            missing2: "Vennligst velg"
        };
    //========================================================================
    // GET VALUES OF ALL INPUTS
    //========================================================================
    answers["mode"] = $("#mode-select").val();
    $("#input input, #input select").each(function () {
        var id = $(this).attr("id");
        if ($(this).is("[type=checkbox]")) {
            answers[id] = $("#" + id).prop("checked");
        } else {
            var IdValue = reverseNumber($("#" + id).val());
            answers[id] = IdValue ? parseFloat(IdValue).toFixed(3) : ($(this).is("select") ? null : 0);
        }
    });

    //========================================================================
    // set constants
    var ABS_1 = 1656.418779;
    var ABS_2 = 2534.305522;
    var ABS_3 = 745.9803873;
    var ABS_4 = 594.6831375;
    var ABS_5 = 268.9524326;
    var ABS_6 = 339.138554;
    var ABS_7 = 335.467128;
    var ABS_8 = 0;

    // Add pptx
    // result 1
    var TempResult1_1 = +answers["ABS1_1"] * 0.01 * +answers["ATT1"];
    var TempResult2_1 = +answers["ABS2_1"] * 0.01 * +answers["ATT1"];
    var TempResult3_1 = +answers["ABS3_1"] * 0.01 * +answers["ATT1"];
    var TempResult4_1 = +answers["ABS4_1"] * 0.01 * +answers["ATT1"];
    var TempResult5_1 = +answers["ABS5_1"] * 0.01 * +answers["ATT1"];
    var TempResult6_1 = +answers["ABS6_1"] * 0.01 * +answers["ATT1"];
    var TempResult7_1 = +answers["ABS7_1"] * 0.01 * +answers["ATT1"];
    var TempResult8_1 = +answers["ABS8_1"] * 0.01 * +answers["ATT1"];

    $("#TempResult1_1").text(format(TempResult1_1.toFixed(3),3));
    $("#TempResult2_1").text(format(TempResult2_1.toFixed(3), 3));
    $("#TempResult3_1").text(format(TempResult3_1.toFixed(3), 3));
    $("#TempResult4_1").text(format(TempResult4_1.toFixed(3), 3));
    $("#TempResult5_1").text(format(TempResult5_1.toFixed(3), 3));
    $("#TempResult6_1").text(format(TempResult6_1.toFixed(3), 3));
    $("#TempResult7_1").text(format(TempResult7_1.toFixed(3), 3));
    $("#TempResult8_1").text(format(TempResult8_1.toFixed(3), 3));

    // result 2
    var TempResult1_2 = TempResult1_1 * (ABS_1 * +answers["ABS1_2"] * (+answers["ABS1_3"] * 0.01));
    var TempResult2_2 = TempResult2_1 * (ABS_2 * +answers["ABS2_2"] * (+answers["ABS2_3"] * 0.01));
    var TempResult3_2 = TempResult3_1 * (ABS_3 * +answers["ABS3_2"] * (+answers["ABS3_3"] * 0.01));
    var TempResult4_2 = TempResult4_1 * (ABS_4 * +answers["ABS4_2"] * (+answers["ABS4_3"] * 0.01));
    var TempResult5_2 = TempResult5_1 * (ABS_5 * +answers["ABS5_2"] * (+answers["ABS5_3"] * 0.01));
    var TempResult6_2 = TempResult6_1 * (ABS_6 * +answers["ABS6_2"] * (+answers["ABS6_3"] * 0.01));
    var TempResult7_2 = TempResult7_1 * (ABS_7 * +answers["ABS7_2"] * (+answers["ABS7_3"] * 0.01));
    var TempResult8_2 = TempResult8_1 * (ABS_8 * +answers["ABS8_2"] * (+answers["ABS8_3"] * 0.01));

    $("#TempResult1_2").text(format(TempResult1_2.toFixed(3), 3));
    $("#TempResult2_2").text(format(TempResult1_2.toFixed(3), 3));
    $("#TempResult3_2").text(format(TempResult1_2.toFixed(3), 3));
    $("#TempResult4_2").text(format(TempResult1_2.toFixed(3), 3));
    $("#TempResult5_2").text(format(TempResult1_2.toFixed(3), 3));
    $("#TempResult6_2").text(format(TempResult1_2.toFixed(3), 3));
    $("#TempResult7_2").text(format(TempResult1_2.toFixed(3), 3));
    $("#TempResult8_2").text(format(TempResult1_2.toFixed(3), 3));
    // result 3
    var TempResult9_1 = TempResult1_2 + TempResult2_2 + TempResult3_2 + TempResult4_2 + TempResult5_2
        + TempResult6_2 + TempResult7_2 + TempResult8_2;
    $("#TempResult9_1").text(format(TempResult9_1.toFixed(3), 3));

    // result 4
    var TempResult_ATT_1 = +answers["ATT9"] + +answers["ATT8"] + +answers["ATT7"] + +answers["ATT6"] + +answers["ATT5"];
    $("#TempResult_ATT_1").text(format(TempResult_ATT_1.toFixed(3), 3));

    // result 5 
    var TempResult_ATT_2 = +answers["ATT10"] + +answers["ATT11"] + +answers["ATT12"] + +answers["ATT13"] + +answers["ATT14"]
        + +answers["ATT15"] + +answers["ATT16"];
    $("#TempResult_ATT_2").text(format(TempResult_ATT_2.toFixed(3), 3));

    // result 6
    var TempResult_ATT_3 = +answers["ATT17"] + +answers["ATT18"] + +answers["ATT19"] + +answers["ATT20"] + +answers["ATT21"]
        + +answers["ATT22"] + +answers["ATT23"] + +answers["ATT24"] + +answers["ATT25"];
    $("#TempResult_ATT_3").text(format(TempResult_ATT_3.toFixed(3), 3));

    // result 7
    var TempResult_ATT_4 = TempResult_ATT_2 - TempResult_ATT_3;
    $("#TempResult_ATT_4").text(format(TempResult_ATT_4.toFixed(3), 3));

    // result 8
    //var TempResult_UDRE_1 = +answers["ATT1"] + +answers["ATT2"];
    //$("#TempResult_UDRE_1").text(format(TempResult_UDRE_1.toFixed(2), 0));
    //$("#Result_UDRE_1").text(format(TempResult_UDRE_1.toFixed(2), 0));

    // result 9
    var TempResult_UDRE_2 = RoundNumber(TempResult1_1 + TempResult2_1 + TempResult3_1 + TempResult4_1 + TempResult5_1
        + TempResult6_1 + TempResult7_1);
    //var TempResult_UDRE_2_ToFixed = FormatterUnit(TempResult_UDRE_2);
    var TempResult_UDRE_2_ToFixed = format(TempResult_UDRE_2.toFixed(2), 0);
    $("#TempResult_UDRE_2").text(TempResult_UDRE_2_ToFixed);
    $("#Result_UDRE_2").text(TempResult_UDRE_2_ToFixed);

    // result 10
    var TempResult_UDRE_3 = RoundNumber(TempResult8_1 + +answers["ATT2"]);
    //var TempResult_UDRE_3_ToFixed = FormatterUnit(TempResult_UDRE_3);
    var TempResult_UDRE_3_ToFixed = format(TempResult_UDRE_3.toFixed(2), 0);
    $("#TempResult_UDRE_3").text(TempResult_UDRE_3_ToFixed);
    $("#Result_UDRE_3").text(TempResult_UDRE_3_ToFixed);

    var TempResult_UDRE_1 = RoundNumber(TempResult1_1 + TempResult2_1 + TempResult3_1 + TempResult4_1 + TempResult5_1
        + TempResult6_1 + TempResult7_1 + TempResult8_1 + +answers["ATT2"]);
    //var TempResult_UDRE_1_ToFixed = FormatterUnit(TempResult_UDRE_1);
    var TempResult_UDRE_1_ToFixed = format(TempResult_UDRE_1.toFixed(2), 0);
    $("#TempResult_UDRE_1").text(TempResult_UDRE_1_ToFixed);
    $("#Result_UDRE_1").text(TempResult_UDRE_1_ToFixed);

    // result 11
    var TempResult_UDRE_4 = +answers["ATT2"];
    $("#TempResult_UDRE_4").text(format(TempResult_UDRE_4.toFixed(3), 3));

    // result 12
    var ABS1_3_M_TempResult1_1 = +answers["ABS1_3"] * TempResult1_1;
    var ABS2_3_M_TempResult2_1 = +answers["ABS2_3"] * TempResult2_1;
    var ABS3_3_M_TempResult3_1 = +answers["ABS3_3"] * TempResult3_1;
    var ABS4_3_M_TempResult4_1 = +answers["ABS4_3"] * TempResult4_1;
    var ABS5_3_M_TempResult5_1 = +answers["ABS5_3"] * TempResult5_1;

    //var TempResult_UDRE_5 = RoundNumber(ABS1_3_M_TempResult1_1 + ABS2_3_M_TempResult2_1 + ABS3_3_M_TempResult3_1
    //    + ABS4_3_M_TempResult4_1 + ABS5_3_M_TempResult5_1);
    //$("#TempResult_UDRE_5").text(format(TempResult_UDRE_5.toFixed(2), 0));
    //$("#Result_UDRE_5").text(format(TempResult_UDRE_5.toFixed(2), 0));

    // result 13
    var TempResult_UDRE_6 = RoundNumber(ABS1_3_M_TempResult1_1 + ABS2_3_M_TempResult2_1 + ABS3_3_M_TempResult3_1);
    //var TempResult_UDRE_6_ToFixed = FormatterUnit(TempResult_UDRE_6);
    var TempResult_UDRE_6_ToFixed = format(TempResult_UDRE_6.toFixed(2), 0);
    //$("#TempResult_UDRE_6").text(format(TempResult_UDRE_6.toFixed(2), 0));
    //$("#Result_UDRE_6").text(format(TempResult_UDRE_6.toFixed(2), 0));

    $("#TempResult_UDRE_6").text(TempResult_UDRE_6_ToFixed);
    $("#Result_UDRE_6").text(TempResult_UDRE_6_ToFixed);

    // result 14
    var TempResult_UDRE_7 = RoundNumber(ABS4_3_M_TempResult4_1 + ABS5_3_M_TempResult5_1);
    //var TempResult_UDRE_7_ToFixed = FormatterUnit(TempResult_UDRE_7);
    var TempResult_UDRE_7_ToFixed = format(TempResult_UDRE_7.toFixed(2), 0);
    $("#TempResult_UDRE_7").text(TempResult_UDRE_7_ToFixed);
    $("#Result_UDRE_7").text(TempResult_UDRE_7_ToFixed);

    var TempResult_UDRE_5 = RoundNumber(ABS1_3_M_TempResult1_1 + ABS2_3_M_TempResult2_1 + ABS3_3_M_TempResult3_1 + ABS4_3_M_TempResult4_1 + ABS5_3_M_TempResult5_1);
    //var TempResult_UDRE_5_ToFixed = FormatterUnit(TempResult_UDRE_5);
    var TempResult_UDRE_5_ToFixed = format(TempResult_UDRE_5.toFixed(2), 0);
    $("#TempResult_UDRE_5").text(TempResult_UDRE_5_ToFixed);
    $("#Result_UDRE_5").text(TempResult_UDRE_5_ToFixed);

    // result 15
    //var TempResult_UDRE_8 = RoundNumber(TempResult9_1 - TempResult_ATT_1 + +answers["ATT4"] + +answers["ATT26"] + TempResult_ATT_4);
    //$("#TempResult_UDRE_8").text(format(TempResult_UDRE_8.toFixed(2), 0));
    //$("#Result_UDRE_8").text(format(TempResult_UDRE_8.toFixed(2), 0));

    // result 16
    var TempResult_UDRE_9 = RoundNumber(TempResult_ATT_4 + +answers["ATT4"] + +answers["ATT26"]);
    //var TempResult_UDRE_9_ToFixed = FormatterUnit(TempResult_UDRE_9);
    var TempResult_UDRE_9_ToFixed = format(TempResult_UDRE_9.toFixed(2), 0);
    $("#TempResult_UDRE_9").text(TempResult_UDRE_9_ToFixed);
    $("#Result_UDRE_9").text(TempResult_UDRE_9_ToFixed);

    // result 17
    var TempResult_UDRE_10 = RoundNumber(TempResult9_1 - TempResult_ATT_1);
    //var TempResult_UDRE_10_ToFixed = FormatterUnit(TempResult_UDRE_10);
    var TempResult_UDRE_10_ToFixed = format(TempResult_UDRE_10.toFixed(2), 0);
    $("#TempResult_UDRE_10").text(TempResult_UDRE_10_ToFixed);
    $("#Result_UDRE_10").text(TempResult_UDRE_10_ToFixed);

    var TempResult_UDRE_8 = RoundNumber(TempResult_ATT_4 + +answers["ATT4"] + +answers["ATT26"] + TempResult9_1 - TempResult_ATT_1);
    //var TempResult_UDRE_8_ToFixed = FormatterUnit(TempResult_UDRE_8);
    var TempResult_UDRE_8_ToFixed = format(TempResult_UDRE_8.toFixed(2), 0);
    $("#TempResult_UDRE_8").text(TempResult_UDRE_8_ToFixed);
    $("#Result_UDRE_8").text(TempResult_UDRE_8_ToFixed);

    // result 19
    var TempResult_UDRE_12 = +answers["ATT3"];
    //var TempResult_UDRE_12_ToFixed = FormatterUnit(TempResult_UDRE_12);
    var TempResult_UDRE_12_ToFixed = format(TempResult_UDRE_12.toFixed(2), 0);
    $("#TempResult_UDRE_12").text(TempResult_UDRE_12_ToFixed);
    $("#Result_UDRE_12").text(TempResult_UDRE_12_ToFixed);

    // result 20
    var TempResult_UDRE_13 = TempResult_UDRE_10 * 0.87 * 0.000001;
    //var TempResult_UDRE_13_ToFixed = FormatterUnit(TempResult_UDRE_13);
    var TempResult_UDRE_13_ToFixed = format(TempResult_UDRE_13.toFixed(2), 0);
    $("#TempResult_UDRE_13").text(TempResult_UDRE_13_ToFixed);
    $("#Result_UDRE_13").text(TempResult_UDRE_13_ToFixed);

    // result 18
    var TempResult_UDRE_11 = +answers["ATT3"] + ((TempResult9_1 - TempResult_ATT_1) * 0.87 * 0.000001);
    //var TempResult_UDRE_11_ToFixed = FormatterUnit(TempResult_UDRE_11);
    var TempResult_UDRE_11_ToFixed = format(TempResult_UDRE_11.toFixed(2), 0);
    $("#TempResult_UDRE_11").text(TempResult_UDRE_11_ToFixed);
    $("#Result_UDRE_11").text(TempResult_UDRE_11_ToFixed);

    // result 22
    var TempResult_UDRE_15 = RoundNumber(TempResult_ATT_4);
    //var TempResult_UDRE_15_ToFixed = FormatterUnit(TempResult_UDRE_15);
    var TempResult_UDRE_15_ToFixed = format(TempResult_UDRE_15.toFixed(2), 0);
    $("#TempResult_UDRE_15").text(TempResult_UDRE_15_ToFixed);
    $("#Result_UDRE_15").text(TempResult_UDRE_15_ToFixed);

    // result 23
    var TempResult_UDRE_16 = RoundNumber(TempResult_UDRE_10 * 0.25 + TempResult_UDRE_10 * 0.11);
    //var TempResult_UDRE_16_ToFixed = FormatterUnit(TempResult_UDRE_16);
    var TempResult_UDRE_16_ToFixed = format(TempResult_UDRE_16.toFixed(2), 0);
    $("#TempResult_UDRE_16").text(TempResult_UDRE_16_ToFixed);
    $("#Result_UDRE_16").text(TempResult_UDRE_16_ToFixed);

    // result 21
    var TempResult_UDRE_14 = RoundNumber(TempResult_ATT_4 + (TempResult_UDRE_10 * 0.25 + TempResult_UDRE_10 * 0.11));
    //var TempResult_UDRE_14_ToFixed = FormatterUnit(TempResult_UDRE_14);
    var TempResult_UDRE_14_ToFixed = format(TempResult_UDRE_14.toFixed(2), 0);
    $("#TempResult_UDRE_14").text(TempResult_UDRE_14_ToFixed);
    $("#Result_UDRE_14").text(TempResult_UDRE_14_ToFixed);


    // End Add pptx
    //========================================================================

    //========================================================================
    // OTHER FUNCTIONS
    //========================================================================
    function showError(input, message) {
        //if ((valid && errorMode) || !errorMode) {
        //    if (message) {
        //        var td = input.closest("td"),
        //            error = $("<div class='input-error'>" + message + "</div>").css({
        //                "top": input.offset().top - td.offset().top,
        //                "left": input.offset().left - td.offset().left + input.width() + 15
        //            }).insertAfter(input);
        //    }
        //    input.addClass("red-border");
        //    input.on("change.confirmChange", function () {
        //        if (error) error.remove();
        //        input.removeClass("red-border");
        //        input.off("change.confirmChange");
        //    });
        //    valid = false;
        //}
    }

    function format(n, decimal) {
        var factor = Math.pow(10, decimal),
            result = (Math.round(n * factor) / factor).toString().replace(".", thousandSeparator == "." ? "," : ".");

        while (true) {
            var temp = result.replace(/(\d+)(\d{3})/g, "$1" + thousandSeparator + "$2");
            if (result == temp) break;
            result = temp;
        }
        return result;
    }

    function reverseNumber(value) {
        value = value.split('.').join("");
        value = value.replace(/,/g, '.');
        return value;
    }

    function FormatterUnit(num) {
        var result;

        if (Math.abs(num) > 999 && Math.abs(num) < 1000000) {
            result = format(Math.sign(num) * ((Math.abs(num) / 1000).toFixed(0)), 0) + ' tusinde';;
        }
        else if (Math.abs(num) > 999999) {
            result = format(Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(0)), 0) + ' mio';
        } else {
            result = format(Math.sign(num) * Math.abs(num), 0);
        }

        return result;
    }

    function RoundNumber(num) {
        var resultRoundNumber = 0;

        if (num >= 10000 && num < 99999) {
            resultRoundNumber = Number(Math.round(num / 10000 + 'e1') + 'e-1') * 10000;
        } else if (num >= 100000 && num < 999999) {
            //resultRoundNumber = Number(Math.round(num / 100000 + 'e1') + 'e-1') * 100000;
            resultRoundNumber = Number(Math.round(num / 100000 + 'e2') + 'e-2') * 100000;
        } else if (num >= 1000000 && num < 9999999) {
            resultRoundNumber = Number(Math.round(num / 1000000 )) * 1000000;
        } else if (num >= 10000000) {
            resultRoundNumber = Number(Math.round(num / 10000000 + 'e1') + 'e-1') * 10000000;
        } else {
            resultRoundNumber = num;
        }

        return resultRoundNumber;
    }

    return valid;
}