(function(Scratch) {
    'use strict';

    class Extension {
        constructor() {
            // Track mouse states for clicked/released logic
            this.prevMouse = { 0: false, 1: false, 2: false };
            this.currMouse = { 0: false, 1: false, 2: false };

            // Update the states every frame
            if (typeof vm !== 'undefined') {
                vm.runtime.on('RUNTIME_STEP_START', () => {
                    for (let i = 0; i <= 2; i++) {
                        this.prevMouse[i] = this.currMouse[i];
                        this.currMouse[i] = vm.runtime.ioDevices.mouse.getIsDown([i]);
                    }
                });
            }
        }

        getInfo() {
            return {
                id: 'stickfightHelper',
                name: 'Helper',
                color1: '#1b1b1b',
                color2: '#4a4a4a',
                color3: '#f1f1f1',
                blocks: [
                    {
                        opcode: 'setruntimesettings',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set runtime [MENU] to [BOOLEAN]',
                        arguments: {
                            MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'projectsettings',
                            },
                            BOOLEAN: {
                                type: Scratch.ArgumentType.BOOLEAN,
                            },
                        }
                    }, 
                    {
                        opcode: 'setframerate',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set frame rate [FPSVALUE]',
                        arguments: {
                            FPSVALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                            },
                        }
                    }, 
                    {
                        opcode: 'setstagesizewidth',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set stage Width [WIDTHVALUE]',
                        arguments: {
                            WIDTHVALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                            },
                        }
                    }, 
                    {
                        opcode: 'setstagesizeheight',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set stage Height [HEIGHTVALUE]',
                        arguments: {
                            HEIGHTVALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                            },
                        }
                    }, 
                    {
                        opcode: 'getstagewidth',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'stage Width',
                    }, 
                    {
                        opcode: 'getstageheight',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'stage Height',
                    }, 
                    {
                        opcode: 'mousedown',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'mouse [MOUSEMENU] [ACTIONMENU]',
                        arguments: {
                            MOUSEMENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'mousebuttons',
                                acceptReporters: true,
                            },
                            ACTIONMENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'mouseactions',
                                acceptReporters: true,
                            }
                        }
                    }, 
                    {
                        opcode: 'setcursorstyle',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set cursor to [CURSORMENU]',
                        arguments: {
                            CURSORMENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'cursorstyles',
                                acceptReporters: true
                            },
                        }
                    }
                ],
                menus: {
                    projectsettings: {
                        acceptReporters: true,
                        items: [
                            { text: "High Quality Pen", value: 'high.quality.pen' },
                            { text: "Turbo Mode", value: 'turbo.mode' },
                            { text: "Warp Timer", value: 'warp.timer' },
                            { text: "Fencing", value: 'fencing' },
                            { text: "---", value: 'divider' },
                            { text: "Remove Misc Limits", value: 'misc.limits' },
                            { text: "Disable Offscreen Rendering", value: 'offscreen.rendering' },
                            { text: "Enable Dangerous Optimizations", value: 'dangerous.optimizations' },
                            { text: "Disable Direction Clamping", value: 'direction.clamp' },
                            { text: "Enable Interpolation", value: 'interpolation' },
                        ]
                    },
                    mousebuttons: {
                        items: [
                            { text: "Left", value: '0' },
                            { text: "Middle", value: '1' },
                            { text: "Right", value: '2' },
                            { text: "Any", value: 'any' },
                        ]
                    },
                    mouseactions: {
                        items: [
                            { text: "down", value: 'down' },
                            { text: "clicked", value: 'clicked' },
                            { text: "released", value: 'released' }
                        ]
                    },
                    cursorstyles: [
                        { text: "Default", value: 'default' },
                        { text: "Pointer", value: 'pointer' },
                        { text: "Move", value: 'move' },
                        { text: "Grab", value: 'grab' },
                        { text: "Grabbing", value: 'grabbing' },
                        { text: "Text", value: 'text' },
                        { text: "Vertical text", value: 'vertical-text' },
                        { text: "Wait", value: 'wait' },
                        { text: "Progress", value: 'progress' },
                        { text: "Help", value: 'help' },
                        { text: "Context menu", value: 'context-menu' },
                        { text: "Zoom in", value: 'zoom-in' },
                        { text: "Zoom out", value: 'zoom-out' },
                        { text: "Crosshair", value: 'crosshair' },
                        { text: "Cell", value: 'cell' },
                        { text: "Not allowed", value: 'not-allowed' },
                        { text: "Copy", value: 'copy' },
                        { text: "Alias", value: 'alias' },
                        { text: "No drop", value: 'no-drop' },
                        { text: "All scroll", value: 'all-scroll' },
                        { text: "Col resize", value: 'col-resize' },
                        { text: "Row resize", value: 'row-resize' },
                        { text: "N resize", value: 'n-resize' },
                        { text: "E resize", value: 'e-resize' },
                        { text: "S resize", value: 's-resize' },
                        { text: "W resize", value: 'w-resize' },
                        { text: "Ne resize", value: 'ne-resize' },
                        { text: "Nw resize", value: 'nw-resize' },
                        { text: "SE resize", value: 'se-resize' },
                        { text: "SW resize", value: 'sw-resize' },
                        { text: "EW resize", value: 'ew-resize' },
                        { text: "NS resize", value: 'ns-resize' },
                        { text: "NESW resize", value: 'nesw-resize' },
                        { text: "NWSE resize", value: 'nwse-resize' },
                    ]
                }
            }
        }

        setruntimesettings(args) {
            const booleanValue = args.BOOLEAN;
            const option = args.MENU;

            switch (option) {
                case 'high.quality.pen':
                    vm.renderer.setUseHighQualityRender(booleanValue);
                    break;
                case 'turbo.mode':
                    vm.setTurboMode(booleanValue);
                    break;
                case 'warp.timer':
                    vm.setCompilerOptions({
                        enabled: true,
                        warpTimer: booleanValue
                    });
                    break;
                case 'fencing':
                    vm.setRuntimeOptions({
                        fencing: booleanValue
                    });
                    break;
                case 'misc.limits':
                    vm.setRuntimeOptions({
                        miscLimits: !booleanValue
                    });
                    break;
                case 'offscreen.rendering':
                    vm.setRuntimeOptions({
                        disableOffscreenRendering: booleanValue
                    });
                    break;
                case 'dangerous.optimizations':
                    vm.setRuntimeOptions({
                        dangerousOptimizations: booleanValue
                    });
                    break;
                case 'direction.clamp':
                    vm.setRuntimeOptions({
                        disableDirectionClamping: booleanValue
                    });
                    break;
                case 'interpolation':
                    vm.runtime.setInterpolation(booleanValue);
                    break;
            }
        }

        setframerate(args) {
            vm.runtime.frameLoop.setFramerate(Math.min(Math.max(args.FPSVALUE, 0), 250));
        }

        setstagesizewidth(args) {
            vm.runtime.setStageSize(args.WIDTHVALUE, this.getstageheight());
        }

        setstagesizeheight(args) {
            vm.runtime.setStageSize(this.getstagewidth(), args.HEIGHTVALUE);
        }

        getstagewidth() {
            return vm.runtime.stageWidth;
        }

        getstageheight() {
            return vm.runtime.stageHeight;
        }

        // Helper to check the state based on the requested action
        _checkState(button, action) {
            const isDown = this.currMouse[button];
            const wasDown = this.prevMouse[button];

            if (action === 'down') return isDown;
            if (action === 'clicked') return isDown && !wasDown;
            if (action === 'released') return !isDown && wasDown;
            
            return false;
        }

        mousedown(args) {
            const buttonArg = args.MOUSEMENU;
            const actionArg = args.ACTIONMENU;

            if (buttonArg === 'any') {
                return [0, 1, 2].some(button => this._checkState(button, actionArg));
            }
            return this._checkState(Number(buttonArg), actionArg);
        }

        setcursorstyle(args) {
            const canvas = Scratch.renderer.canvas;
            canvas.style.cursor = args.CURSORMENU;
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);
