<template>
    <div class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
        <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
        <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <!--content-->
        <div class="">
            <!--body-->
            <div class="text-center p-5 flex-auto justify-center">
                <h2 class="text-xl font-bold py-4 ">Are you sure?</h2>
                <p class="text-sm text-gray-500 px-8">Do you really want to delete your account? This process cannot be undone</p>    
            </div>
            <!--footer-->
            <div class="p-3  mt-2 text-center space-x-4 md:block">
                <button class="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Done</button>
            </div>
        </div>
        </div>
    </div>
</template>
<!-- component -->

<script>
export default {
  name: "Modal",
  data: function () {
    return {}
  }
}
</script>
