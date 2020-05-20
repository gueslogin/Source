//(function ($) {
$(function () {
	//========================================================================
	// OVERALL NAVIGATION
	//========================================================================
	var currentPage = 0,
		modeSelect = $("#mode-select"),
		prevButton = $("#prev"),
        nextButton = $("#next"),
        tempButton = $("#temp"),
        downloadButton = $("#download"),
        prevButtonText = [
            "",
            "Forrige side",
            "Forrige side",
            "Tilbage til indtastning",
            "Tilbage til grafisk rapport"
        ],
        nextButtonText = [
            "Start udregning",
            "Næste side",
            "Næste side",
            "Gå til grafisk rapport",
            ""
        ];

	updateMode();
	updatePage(0);

	modeSelect.on("change", function () {
		updateMode();
	});

    prevButton.on("click", function () {
        document.getElementById("ABS_Total_Error").style.visibility = "hidden";
        updatePage(-1);
        window.scrollTo(0, 0);
        if (currentPage == 1) {
            $("#li1").addClass("active");
            $("#li2").removeClass("active");
            $("#li3").removeClass("active");
            $("#li4").removeClass("active");
        } else if (currentPage == 2) {
            $("#li1").addClass("active");
            $("#li2").addClass("active");
            $("#li3").removeClass("active");
            $("#li4").removeClass("active");
        } else if (currentPage == 3) {
            $("#li1").addClass("active");
            $("#li2").addClass("active");
            $("#li3").addClass("active");
            $("#li4").removeClass("active");
        } else if (currentPage == 4) {
            $("#li1").addClass("active");
            $("#li2").addClass("active");
            $("#li3").addClass("active");
            $("#li4").addClass("active");
        } else {
            $("#li1").removeClass("active");
            $("#li2").removeClass("active");
            $("#li3").removeClass("active");
            $("#li4").removeClass("active");
        }
	});

    nextButton.on("click", function () {
        var valid = true;
        window.scrollTo(0, 0);
        // check total
        if (currentPage == 2) {
            var total = parseInt(document.getElementById("ABS_Total").value == '' ? 0 : document.getElementById("ABS_Total").value);

            if (total >= 98 && total <= 102) {
                document.getElementById("ABS_Total_Error").style.visibility = "hidden";
                valid = true;
            } else {
                document.getElementById("ABS_Total_Error").style.visibility = "visible";
                //document.getElementById("ABS_Total_Error").scrollIntoView();
                valid = false;
            }
        }

        if (valid) {
            if (currentPage == 2 || currentPage == 3) {
                valid = calculate();
                valid = calculateTempResult();
            }

            if (valid) updatePage(1);

            if (currentPage == 1) {
                $("#li1").addClass("active");
                $("#li2").removeClass("active");
                $("#li3").removeClass("active");
                $("#li4").removeClass("active");
            } else if (currentPage == 2) {
                $("#li1").addClass("active");
                $("#li2").addClass("active");
                $("#li3").removeClass("active");
                $("#li4").removeClass("active");
            } else if (currentPage == 3) {
                $("#li1").addClass("active");
                $("#li2").addClass("active");
                $("#li3").addClass("active");
                $("#li4").removeClass("active");
            } else if (currentPage == 4) {
                $("#li1").addClass("active");
                $("#li2").addClass("active");
                $("#li3").addClass("active");
                $("#li4").addClass("active");
            } else {
                $("#li1").removeClass("active");
                $("#li2").removeClass("active");
                $("#li3").removeClass("active");
                $("#li4").removeClass("active");
            }
        }
      
	});

	$(document).on("keydown", function (e) {
		if (!$(e.target).is("input,select")) {
			switch (e.which) {
				case 37: // left
					prevButton.trigger("click");
					break;

				case 39: // right
					nextButton.trigger("click");
					break;

				default: return;
			}
		}
	});

	function updatePage(modifier) {
		currentPage = currentPage + modifier;
		if (currentPage < 0) currentPage = 0;
		if (currentPage > 4) currentPage = 4;
		$('.content').not(":eq(" + currentPage.toString() + ")").toggleClass("hidden", true);
		$('.content').eq(currentPage).toggleClass("hidden", false);
		if (prevButtonText[currentPage]) {
			prevButton.html(prevButtonText[currentPage]);
			prevButton.toggleClass("hidden", false);
		} else {
			prevButton.toggleClass("hidden", true);
		}

		if (nextButtonText[currentPage]) {
			nextButton.html(nextButtonText[currentPage]);
			nextButton.toggleClass("hidden", false);
		} else {
			nextButton.toggleClass("hidden", true);
        }

        if (currentPage == 4) {
            downloadButton.toggleClass("hidden", false);
        } else {
            downloadButton.toggleClass("hidden", true);
        }
	}

	function updateMode() {
		switch (modeSelect.val()) {
			case "B":
				showHideBlock(false, false);
				break;
			case "U":
				showHideBlock(true, false);
				break;
			case "A":
				showHideBlock(true, true);
				break;
		}

		modeSelect.attr("class", modeSelect.val());
	}

	function showHideBlock(uState, aState) {
		var mU = $("#mode .U"),
			mA = $("#mode .A"),
			iU = $("#input #U");
		iA = $("#input #A");
		mU.toggleClass("hidden", !uState);
		mA.toggleClass("hidden", !aState);
		iU.toggleClass("hidden", !uState);
		iA.toggleClass("hidden", !aState);
	}

	//========================================================================
	// INPUT PAGE
	//========================================================================
	buildConnection($("#B2"), $("#B9"));
	buildConnection($("#B3"), $("#B10"));
	buildConnection($("#B4"), $("#B11"));
	buildConnection($("#B5"), $("#B12"));
	buildConnection($("#B2"), $("#A3"));
	buildConnection($("#B3"), $("#A4"));
	buildConnection($("#B4"), $("#A5"));
	buildConnection($("#B5"), $("#A6"));
	buildConnection($("#B2"), $("table.U").last());
	buildWarning($("#B3"), true, "<b>NB:</b> Forbruket for éndagsbesøk er beregnet ut ifra forbruket til norske turister som ikke går til overnatting eller transport i Turistundersøkelsen 2014-2016.");
	buildWarning($("#B4"), true, "<b>NB:</b> Forbruket til turistene som reiser med Hurtigruten er beregnet ut ifra det forbruket som ikke går til overnatting eller transport i Turistundersøkelsen 2014-2016.");
	buildWarning($("#B5"), true, "<b>NB:</b> Det landbaserte forbruket til cruiseturistene er beregnet ut ifra analysen av cruiseturister fra 2014.");
	buildWarning($("#B6"), ["0", "1"], ["<b>NB:</b> Med 'Overnattinger' menes det totale antallet gjestedøgn i området.", "<b>NB:</b> Med 'Turister' menes det totale antallet reisende i området med minst én overnatting."]);
	buildWarning($("#B7"), ["1", "2", "3"], ["<b>NB:</b> Vintersesongen er fra januar til og med april.", "<b>NB:</b> Sommersesongen er fra mai til og med august.", "<b>NB:</b> Høstsesongen er fra september til og med desember."]);
	addUnit();
	addName();
	//buildPercentage();
	buildValidateSum($("#U1,#U2,#U3"), 100);
	buildValidateSum($("#U4,#U5,#U6,#U7"), 100);
	buildValidateSum($("#U8,#U9"), 100);
	buildValidateSum($("#U10,#U11,#U12,#U13"), 100);
	buildValidateSum($("#U14,#U15"), 100);
	buildConnection($("#B3"), $("#result .group:eq(4)"));
	buildConnection($("#B4"), $("#result .group:eq(2)"));
	buildConnection($("#B5"), $("#result .group:eq(3)"));

	function buildConnection(input1, input2) {
		showHide(input1, input2);
		input1.on("change", function () {
			showHide(input1, input2);
		});
	}

	function showHide(input1, input2) {
		var isChecked = input1.prop("checked");
		if (input2.is("table")) {
			input2.toggleClass("hidden", !isChecked);
			if (!isChecked) input2.find("input,select").val("");
		} else {
			input2.toggleClass("hidden", !isChecked);
			if (!input2.is("#result .group")) {
				input2.closest("tr").toggleClass("hidden", !isChecked);
				if (!isChecked) input2.val("");
			}
		}
	}

	function buildScenario(input1, answer, input2) {
		showHideGroup(input1, answer, input2);
		input1.on("change", function () {
			showHideGroup(input1, answer, input2);
		});
	}

	function showHideGroup(input1, answer, input2) {
		var isValid = (input1.val() == answer);
		input2.toggleClass("hidden", !isValid);
		if (!isValid) input2.find("input,select").val("");
	}

	function buildWarning(input, answer, warningtext) {
		showHideWarning(input, answer, warningtext);
		input.on("change", function () {
			showHideWarning(input, answer, warningtext);
		});
	}

	function showHideWarning(input, answer, warningtext) {
		var isValid,
			finalText;
		if (typeof answer == "boolean") {
			isValid = (input.prop("checked") == answer);
			finalText = warningtext;
		} else if (typeof answer == "object") {
			isValid = answer.indexOf(input.val()) >= 0;
			if (isValid) finalText = warningtext[answer.indexOf(input.val())];
		} else {
			isValid = (input.val() == answer);
			finalText = warningtext;
		}

		if (isValid) {
			input.closest("tr").find("td:last-child").html(finalText);
		} else {
			input.closest("tr").find("td:last-child").html("");
		}
	}

	function addUnit() {
		var B6 = $("#B6"),
			B8P = $("#B8").closest("tr").find("td:last-child"),
			B9P = $("#B9").closest("tr").find("td:last-child");

		B6.on("change", function () {
			B8P.html(B6.find("option[value=" + $(this).val() + "]").html());
			B9P.html(B6.find("option[value=" + $(this).val() + "]").html());
		})
	}

	function addName() {
		var B1A = $("#B1A"),
			name = $("#name");

		B1A.on("change", function () {
			if ($(this).val())
				name.html("RESULTATER FOR " + B1A.val());
			else
				name.html("RESULTATER");
		})
	}

	function buildValidateSum(inputList, limit) {
		validateSum(inputList, limit);
		inputList.on("keyup change", function () {
			validateSum(inputList, limit);
		});
	}

	function validateSum(inputList, limit) {
		var textContainer = inputList.eq(0).closest("tr").find("td[rowspan]"),
			sum = 0,
			allBlank = true;

		for (var i = 0; i < inputList.length; i++) {
			var val = inputList.eq(i).val();
			sum = sum + (parseInt(val, 10) || 0);
			if (val) allBlank = false;
		}

		if (allBlank) {
			textContainer.html("<span class='error'>Vennligst inntast opplysninger</span>")
		} else {
			if (sum != limit) {
				textContainer.html("<span class='error'>NB! Tallene summeres ikke til " + limit.toString() + "%. Vennligst korriger.</span>")
			} else {
				textContainer.html("");
			}
		}
	}
});