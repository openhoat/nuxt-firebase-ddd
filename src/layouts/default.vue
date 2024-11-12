<template>
  <div>
    <div>
      <h3>Application</h3>
    </div>
    <client-only>
      <div>
        <h4>Navigation</h4>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li>
            demos
            <ul>
              <li><NuxtLink to="/demos/hello">Hello</NuxtLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </client-only>
    <div class="d-flex flex-column align-center justify-center">
      <div>
        <div style="min-height: 300px"><slot /></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
