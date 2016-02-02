package github.io.stylesheets;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

import org.apache.commons.io.IOUtils;

import ro.isdc.wro.WroRuntimeException;
import ro.isdc.wro.extensions.processor.support.less.LessCss;

/**
 * This implementation uses the wro4j "Web Resources Optimizer" v1.4.5, specifically the LessCss processor
 * {@link http://code.google.com/p/wro4j/}.
 *
 * @author Raymond Chan
 */

public class Less2CssTranslator {

	public Less2CssTranslator() {
		
	}

	public void process(FileReader reader, FileWriter writer) throws Exception {

		LessCss engine = new LessCss();
	
		final String content = IOUtils.toString(reader);
		try {
			writer.write(engine.less(content));
		} catch (final WroRuntimeException e) {
			throw new RuntimeException(e);
		} finally {
			reader.close();
			writer.close();
		}
	}

	/*
	 * Parses a *.less file and writes to a *.css the equivalent.
	 * @args - [0]: Expects a *.less filename {Reader}.  File must exist
	 *         [1]: Expects a *.css filename {writer}, Existing file will be overwritten.
	 */
	public static void main(String [] args) throws Exception {
		if(args.length != 2) {
			System.out.println("ERROR: Received " + args.length + " arguments.  Expected [reader, writer].");
			System.exit(1);
		}

		if(!(new File(args[0])).exists()) {
			System.out.println("\"" + args[0] + "\" not present.  Nothing done, exiting.");
		}

		// [0]: *.less file to be translated
		FileReader reader = new FileReader(args[0]);
		// [1]: *.css target filename
		FileWriter writer = new FileWriter(args[1]);

		Less2CssTranslator translator = new Less2CssTranslator();
		try {
			translator.process(reader, writer);
			System.out.println("Success: Parsed \"" + args[0] + "\" to \"" + args[1] + "\"");
		} catch(Exception e) {
			System.out.println("ERROR: LESS CSS did not parse \"" + args[0] + "\" successfully, please check Less syntax.");
			System.exit(1);
		}
	}
}
