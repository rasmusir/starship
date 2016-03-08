echo "Building JSDocs..."
jsdoc shared/ server/ client/ -r -d resources/docs -t node_modules/minami
echo "Done!"
