if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/Rahul Mewada/.gradle/caches/8.10.2/transforms/2d704cf7c6d74c08859df50f5f9fd2e9/transformed/hermes-android-0.79.0-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/Rahul Mewada/.gradle/caches/8.10.2/transforms/2d704cf7c6d74c08859df50f5f9fd2e9/transformed/hermes-android-0.79.0-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

