if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/Rahul Mewada/.gradle/caches/8.10.2/transforms/fcf0b04232a12796e37d213525fcf0de/transformed/jetified-hermes-android-0.79.0-release/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/Rahul Mewada/.gradle/caches/8.10.2/transforms/fcf0b04232a12796e37d213525fcf0de/transformed/jetified-hermes-android-0.79.0-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

