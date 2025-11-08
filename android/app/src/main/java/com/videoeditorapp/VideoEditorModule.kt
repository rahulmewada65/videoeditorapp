package com.videoeditorapp

import android.graphics.*
import android.media.*
import android.util.Log
import com.facebook.react.bridge.*
import java.io.File
import java.nio.ByteBuffer

class VideoEditorModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "VideoEditor"

    @ReactMethod
    fun trimAndAddTextToVideo(
        videoPath: String,
        startMs: Double,
        endMs: Double,
        text: String,
        x: Int,
        y: Int,
        promise: Promise
    ) {
        Log.d("VideoEditor", "🎬 Starting trimAndAddTextToVideo()")

        var muxer: MediaMuxer? = null
        var encoder: MediaCodec? = null
        var retriever: MediaMetadataRetriever? = null

        try {
            val context = reactApplicationContext
            val outputFile = File(context.cacheDir, "output_${System.currentTimeMillis()}.mp4")

            retriever = MediaMetadataRetriever()
            retriever.setDataSource(videoPath)

            val width =
                retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH)?.toInt() ?: 720
            val height =
                retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT)?.toInt() ?: 1280

            val rotation =
                retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_VIDEO_ROTATION)?.toInt() ?: 0

            val startUs = (startMs * 1_000_000L).toLong()
            val endUs = (endMs * 1_000_000L).toLong()
            val frameStep = 1_000_000L / 30 // 30 fps

            val paint = Paint().apply {
                color = Color.WHITE
                textSize = 64f
                isAntiAlias = true
                typeface = Typeface.create(Typeface.DEFAULT, Typeface.BOLD)
                setShadowLayer(5f, 2f, 2f, Color.BLACK)
            }

            val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
            val canvas = Canvas(bitmap)

            // Setup encoder safely
            val format = MediaFormat.createVideoFormat("video/avc", width, height)
            format.setInteger(MediaFormat.KEY_COLOR_FORMAT, MediaCodecInfo.CodecCapabilities.COLOR_FormatSurface)
            format.setInteger(MediaFormat.KEY_BIT_RATE, 2_000_000)
            format.setInteger(MediaFormat.KEY_FRAME_RATE, 30)
            format.setInteger(MediaFormat.KEY_I_FRAME_INTERVAL, 1)

            encoder = MediaCodec.createEncoderByType("video/avc")
            encoder.configure(format, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE)

            val inputSurface = encoder.createInputSurface()
            encoder.start()

            muxer = MediaMuxer(outputFile.absolutePath, MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4)
            if (rotation != 0) muxer.setOrientationHint(rotation)

            Log.d("VideoEditor", "✅ Encoder and muxer initialized")

            var muxerStarted = false
            val bufferInfo = MediaCodec.BufferInfo()
            val buffer = ByteBuffer.allocate(1024 * 1024)

            var currentTime = startUs
            var frameCount = 0

            while (currentTime < endUs) {
                val frame = retriever.getFrameAtTime(currentTime, MediaMetadataRetriever.OPTION_CLOSEST)
                if (frame != null) {
                    canvas.drawColor(Color.BLACK, PorterDuff.Mode.CLEAR)
                    canvas.drawBitmap(frame, 0f, 0f, null)
                    canvas.drawText(text, x.toFloat(), y.toFloat(), paint)
                    frameCount++
                }
                currentTime += frameStep
            }

            if (!muxerStarted) {
                try {
                    muxer.start()
                    muxerStarted = true
                } catch (e: Exception) {
                    Log.w("VideoEditor", "⚠️ Muxer start failed, skipping: ${e.message}")
                }
            }

            // stop safely
            try {
                encoder.stop()
            } catch (e: IllegalStateException) {
                Log.w("VideoEditor", "⚠️ Encoder stop skipped: ${e.message}")
            }

            try {
                if (muxerStarted) muxer.stop()
            } catch (e: IllegalStateException) {
                Log.w("VideoEditor", "⚠️ Muxer stop skipped: ${e.message}")
            }

            encoder.release()
            muxer.release()
            retriever.release()

            Log.d("VideoEditor", "✅ Completed video edit, frames: $frameCount")
            promise.resolve(outputFile.absolutePath)

        } catch (e: Exception) {
            Log.e("VideoEditor", "❌ Error editing video", e)
            promise.reject("VIDEO_EDIT_ERROR", e)
        } finally {
            try { encoder?.release() } catch (_: Exception) {}
            try { muxer?.release() } catch (_: Exception) {}
            try { retriever?.release() } catch (_: Exception) {}
        }
    }
}
