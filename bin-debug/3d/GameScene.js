var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameScene = (function () {
    function GameScene(context3d) {
        this.lights = new egret3d.LightGroup();
        egret3d.Input.addEventListener(egret3d.OrientationEvent3D.ORIENTATION_CHANGE, this.OnOrientationChange, this);
        egret3d.Input.addEventListener(egret3d.OrientationEvent3D.DEVICE_MOTION, this.OnOrientationMotion, this);
        egret3d.Input.addEventListener(egret3d.OrientationEvent3D.DEVICE_ORIENTATION, this.OnDeviceOrientation, this);
        var view = new egret3d.View3D(0, 0, context3d.width, context3d.height);
        view.camera3D.lookAt(new egret3d.Vector3D(0, 1000, -1000), new egret3d.Vector3D(0, 0, 0));
        view.backColor = 0xff181818;
        context3d.addView3D(view);
        this.view = view;
        this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
        this.cameraCtl.lookAtObject.y = 100;
        this.cameraCtl.distance = 120;
        this.cameraCtl.rotationX = 0;
        this.cameraCtl.rotationY = 0;
        context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        this.tuoluo = new egret3d.OrientationController();
        // this.tuoluo.start(); 
    }
    /**
     * 用户水平或者垂直翻转设备（即方向发生变化）时触发的事件
     * @param e: egret3d.OrientationEvent3D 陀螺仪事件参数
     * @version Egret 3.0
     * @platform Web,Native
     */
    GameScene.prototype.OnOrientationChange = function (e) {
        // alert('触发了');
        //    this.tuoluo.stop();
        // this.cameraCtl.rotationY = e.gamma;
    };
    /**
   * 用户加速晃动或者加速旋转设备（即速度发生变化）时触发的事件
   * @param e: egret3d.OrientationEvent3D 陀螺仪事件参数
   * @version Egret 3.0
   * @platform Web,Native
   */
    GameScene.prototype.OnOrientationMotion = function (e) {
        //    this.cameraCtl.rotationY = e.alpha;
        // alert('加速晃动');
    };
    /**
   * 用户改变旋转重力方向时触发的事件
   * @param e: egret3d.OrientationEvent3D 陀螺仪事件参数
   * @version Egret 3.0
   * @platform Web,Native
   */
    GameScene.prototype.OnDeviceOrientation = function (e) {
        //    this.cameraCtl.rotationY = e.gamma;
        //    this.cameraCtl.rotationX=0;
        //    this.cameraCtl.rotationZ=0;
        this.model.rotationY = e.gamma;
        // this.tuoluo.update(this.view);
        //   this.cameraCtl.update();
        //     this.tuoluo.stop();
        //    alert(this.tuoluo.stop());
        //  this.cameraCtl.rotationX=e.beta;
        //   this.cameraCtl.rotationZ=e.alpha;
        // alert("方向"+e.alpha)
        //   alert('重力方向');
        // alert('it work');
    };
    GameScene.prototype.createGameScene = function () {
        var texture = RES.getRes("3d/background.jpg");
        console.log(texture);
        this.view.backImage = texture;
        var tex = RES.getRes("3d/127.jpg");
        tex.repeat = true;
        // var geo: egret3d.Geometry = RES.getRes("3d/0_Model/Esm/Zhouyu.esm");
        // var clip: egret3d.SkeletonAnimationClip = RES.getRes("3d/0_Model/Eam/attack.eam");
        // var idleClip: egret3d.SkeletonAnimationClip = RES.getRes("3d/0_Model/Eam/idle.eam");
        // var tex: egret3d.ITexture = RES.getRes("3d/0_Model/Texture/hero_01.png");
        // clip.animationName = "attack";
        // idleClip.animationName = "idle";
        // var mesh = new egret3d.Mesh(geo);
        // this.mesh = mesh;
        // clip.isLoop = false;
        // idleClip.isLoop = true;
        // mesh.material.diffuseTexture = tex;
        // mesh.material.ambientColor = 0xb4b4b4;
        // mesh.material.gloss = 10;
        // mesh.material.specularLevel = 0.5;
        // let skeletonController = mesh.animation.skeletonAnimationController;
        // skeletonController.addSkeletonAnimationClip(clip);
        // skeletonController.addSkeletonAnimationClip(idleClip);
        // skeletonController.addEventListener(egret3d.AnimationEvent3D.COMPLETE, this.onAnimationComplete, this);
        // skeletonController.addEventListener(egret3d.AnimationEvent3D.CYCLE, this.onAnimationCycle, this);
        // this.view.addChild3D(mesh);
        // mesh.animation.play(idleClip.animationName);
        // this.lightGroup = new egret3d.LightGroup();
        // var dirLight = new egret3d.DirectLight(new egret3d.Vector3D(1, -1, 0))
        // this.lightGroup.addLight(dirLight);
        // mesh.lightGroup = this.lightGroup
        var mat = new egret3d.TextureMaterial();
        ///创建模型基类
        var ge = new egret3d.SphereGeometry(200, 45, 45);
        ///生成mesh
        this.model = new egret3d.Mesh(ge);
        this.model.material.lightGroup = this.lights;
        // this.model.material.diffuseColor=0xcdcdcd;
        this.model.material.diffuseTexture = tex;
        this.model.y = 100;
        ///插入model
        this.view.addChild3D(this.model);
        // egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.onKeyDown, this);
    };
    GameScene.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case egret3d.KeyCode.Key_1:
                this.mesh.animation.play("attack");
                break;
        }
    };
    GameScene.prototype.onAnimationComplete = function (e) {
        console.log("onAnimationComplete");
        this.mesh.animation.play("idle");
    };
    GameScene.prototype.onAnimationCycle = function (e) {
        console.log("播放完成一个循环");
    };
    GameScene.prototype.update = function (e) {
        this.cameraCtl.update();
    };
    return GameScene;
}());
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map