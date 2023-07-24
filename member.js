function skillsMember() {
    var skills = document.getElementById("skills");
    var skillsMember = document.getElementById("skillsMember");
    var skillsMemberValue = skillsMember.value;
    var skillsMemberValueLength = skillsMemberValue.length;
    var skillsMemberValueLengthMax = skillsMember.getAttribute("maxlength");
    var skillsMemberValueLengthMaxInt = parseInt(skillsMemberValueLengthMax);
    var skillsMemberValueLengthMaxIntMinus = skillsMemberValueLengthMaxInt - skillsMemberValueLength;
    skills.innerHTML = skillsMemberValueLengthMaxIntMinus;
    if (skillsMemberValueLengthMaxIntMinus <= 0) {
        skills.style.color = "red";
    } else {
        skills.style.color = "black";
    }
}
