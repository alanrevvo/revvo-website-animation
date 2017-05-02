// Constant (width, height) of the canvas
   		uniform vec2 u_resolution;
		
		// (x, y) coordinate position of the pixel
		attribute vec2 a_position;
		
		// (r, g, b, a) color of the pixel
		attribute vec4 a_color;
		varying vec4 v_color;
		
		// Size of the pixel
		attribute float a_size;
		
		void main() {
			// convert the rectangle from pixels to 0.0 to 1.0
			vec2 zeroToOne = a_position / u_resolution;
		
			// convert from 0->1 to 0->2
			vec2 zeroToTwo = zeroToOne * 2.0;
		
			// convert from 0->2 to -1->+1 (clipspace)
			vec2 clipSpace = zeroToTwo - 1.0;
		
			gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
			
			gl_PointSize = a_size;
			
			v_color = a_color;
		}