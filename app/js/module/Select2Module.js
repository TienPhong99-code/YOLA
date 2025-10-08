export default function Select2Module() {
  $(document).ready(function () {
    $(".re-select-main").select2();

    $(".re-select-main-old").change(function () {
      if ($(this).val() !== "") {
        var valueAtIndex2 = $(".re-select-main-course option").eq(1).val();
        $(".re-select-main-course").val(valueAtIndex2).trigger("change");
      }
    });
  });
}
