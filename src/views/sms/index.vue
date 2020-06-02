<template>
  <div class="app-container">
    <div style="margin:0 0 5px 20px">短信发送统计</div>
    <span>发送的短信</span>

    <!-- <div style="margin:30px 0 5px 20px">
      Not fixed header, sorted by click order
    </div>
    <unfixed-thead />-->
  </div>
</template>

<script>
import FixedThead from './components/FixedThead'
// import UnfixedThead from './components/UnfixedThead'

export default {
  name: 'DynamicTable',
  components: { FixedThead }
}
</script>
