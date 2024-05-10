//Settings slide (open or closed)
var slide = false;


//===--------> Team button
//Lorsqu'un élément de formulaire avec le nom teamButton est cliqué, une fonction est déclenchée.
//Et cette fonction est la fonction qui permet de changer de Right to Left avec mise à jour de UI changer right to left or left to right

$("input[name=teamButton]").click(() => {
  if($("input[name=teamButton]").val() == "Right")
    $("input[name=teamButton]").val("Left");
  else
    $("input[name=teamButton]").val("Right");
  $("input[name=team]").val($("input[name=teamButton]").val().toLowerCase());
});



//----------> Settings button
//Quand je clique sur le boouton settings on voit si slide=true ou non si non dc la dropdown list est fermée.
//Pour affichage de la liste ça se fait en slideDown or Up.
$("input[name=settings]").click(() => {
  if(!slide) {
    $("#settingsList").slideDown(300);
    $("input[name=settings]").addClass("hovered");
    slide = true;
  } else {
    $("#settingsList").slideUp(300);
    $("input[name=settings]").removeClass("hovered");
    slide = false;
  }
}); 



//=======> Theme option in the settings
//Lorsque l'élément avec l'ID theme est cliqué, une fonction est déclenchée.
//Le code vérifie le texte actuel de l'option de thème.
//Si le texte est "Theme: Sombre", il est changé en "Theme: Clair", et vice versa.

$("#theme").click(() => {
  var theme = $("#theme");
  if(theme.text() == "Theme: Sombre") {
    theme.text("Theme: Clair");
    $('link[href="/stylesheets/loginStyle.css"]').attr('href','/stylesheets/loginStyleLight.css');
  }
  else {
    theme.text("Theme: Sombre");
    $('link[href="/stylesheets/loginStyleLight.css"]').attr('href','/stylesheets/loginStyle.css');
  }
  $("input[name=theme]").val(theme.text().includes("Sombre") ? "sombre": "clair");
});



//================== Hide names option in the settings

//Lorsqu'on clique sur l'option de masquage des noms (élément avec l'ID displayNames):
//Si les noms sont visibles :
//Un symbole de coche est ajouté à l'option pour indiquer que les noms sont masqués.
//La valeur de l'option est définie sur "false".
//Si les noms sont déjà masqués :
//Le symbole de coche est retiré.
//La valeur de l'option est définie sur "true".

$("#displayNames").click(() => {
  var el = $("#displayNames");
  if($("i").length == 0) {
    el.append('<i class="fa fa-check" aria-hidden="true"></i>');
    $("input[name=displayNames]").val("false");
  } else {
    el.children("i").remove();
    $("input[name=displayNames]").val("true");
  }
});