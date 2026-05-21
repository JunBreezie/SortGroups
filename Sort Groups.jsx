// -------------------------------------------
// Photoshop Group Sorter (2026 Compatible)
// --
//
// Description:
// Sorts ONLY groups (LayerSets) inside the
// selected folder in Photoshop.
//
// - Works recursively for nested groups
// - A → Z alphabetical sorting
// - Natural numeric sorting (1, 2, 10)
// - Does NOT affect individual layers
// - Safe for Photoshop 2026 scripting engine
// -------------------------------------------


#target photoshop

app.bringToFront();

(function () {

    var ascending = true;

    if (!app.documents.length) {
        alert("No document open.");
        return;
    }

    var doc = app.activeDocument;
    var target = doc.activeLayer;

    // =========================
    // VALIDATE SELECTION
    // =========================

    if (!target || target.typename !== "LayerSet") {
        alert("Please select a GROUP (folder) in the Layers panel.");
        return;
    }

    // =========================
    // PROGRESS UI
    // =========================

    var win = new Window("palette", "Sorting Selected Group...");
    win.orientation = "column";
    win.alignChildren = "fill";

    var status = win.add("statictext", undefined, "Starting...");
    var bar = win.add("progressbar", undefined, 0, 100);
    bar.preferredSize.width = 360;

    var detail = win.add("statictext", undefined, "");
    detail.characters = 45;

    win.show();

    // =========================
    // MAIN
    // =========================

    try {
        doc.suspendHistory("Sort Selected Group", "main()");
    } catch (e) {
        main();
    }

    function main() {

        status.text = "Sorting: " + target.name;
        win.update();

        sortGroup(target);

        bar.value = 100;
        status.text = "Done";
        detail.text = "";

        win.update();

        alert("Selected group sorted.");
        win.close();
    }

    // =========================
    // SORT ONE GROUP (RECURSIVE)
    // =========================

    function sortGroup(group) {

        var layers = group.layers;
        var groups = [];
        var i;

        // snapshot ONLY groups
        for (i = 0; i < layers.length; i++) {
            if (layers[i].typename === "LayerSet") {
                groups.push(layers[i]);
            }
        }

        if (groups.length < 1) return;

        // recursive sort first
        for (i = 0; i < groups.length; i++) {
            sortGroup(groups[i]);
        }

        // sort names naturally
        groups.sort(naturalCompare);
        if (!ascending) groups.reverse();

        // rebuild stack safely
        var ref = layers[0];

        for (i = 0; i < groups.length; i++) {

            detail.text = "Moving: " + groups[i].name;
            win.update();

            groups[i].move(ref, ElementPlacement.PLACEBEFORE);
        }
    }

    // =========================
    // NATURAL SORT
    // =========================

    function naturalCompare(a, b) {

        var ax = [], bx = [];

        a.name.replace(/(\d+)|(\D+)/g, function (_, n, s) {
            ax.push([n ? parseInt(n, 10) : Infinity, (s || "").toLowerCase()]);
        });

        b.name.replace(/(\d+)|(\D+)/g, function (_, n, s) {
            bx.push([n ? parseInt(n, 10) : Infinity, (s || "").toLowerCase()]);
        });

        while (ax.length && bx.length) {

            var an = ax.shift();
            var bn = bx.shift();

            if (an[1] !== bn[1]) return an[1] > bn[1] ? 1 : -1;
            if (an[0] !== bn[0]) return an[0] - bn[0];
        }

        return ax.length - bx.length;
    }

})();