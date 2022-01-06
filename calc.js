//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hours: " );
	txt.SetTextSize( 22 );
	hlbl  = app.CreateText( "" );
	lay.AddChild( txt);
	lay.AddChild( hlbl );
	hrb = app.CreateSeekBar(0.8 );
	hrb.SetRange(400);
	hrb.SetValue(300);
	hrb.SetOnTouch( hrb_OnTouch )
	lay.AddChild(hrb);
	hlbl.SetText( hrb.GetValue() );
	
	rtxt = app.CreateText("hourly Rate: ");
	rtxt.SetTextSize(22);
	rlbl  = app.CreateText( "" );
	lay.AddChild( rtxt);
	lay.AddChild(rlbl);
	rsb  = app.CreateSeekBar( 0.8 );
	rsb.SetRange(20);
	rsb.SetValue(18.5);
	rsb.SetOnTouch( rsb_OnTouch )
	rlbl.SetText(rsb.GetValue());
	lay.AddChild( rsb );
	
	prtxt  = app.CreateText( "Painter rate" );
	prtxt.SetTextSize( 22 );
	plbl  = app.CreateText( "" );
	lay.AddChild( prtxt );
	lay.AddChild( plbl);

	prsb  = app.CreateSeekBar( 0.8 );
	prsb.SetRange( 100 );
	prsb.SetValue( 60 );
	prsb.SetOnTouch( prsb_OnTouch )
  plbl.SetText( prsb.GetValue() );
	lay.AddChild( prsb );
	
	hptxt  = app.CreateText( "Helper One:" );
	hplbl  = app.CreateText( "" );
	lay.AddChild( hptxt );
	lay.AddChild( hplbl );
	hpsb  = app.CreateSeekBar( 0.8 );
	hpsb.SetRange( 100 );
	hpsb.SetValue( 20 );
	hpsb.SetOnTouch( hpsb_OnTouch );
	hplbl.SetText( hpsb.GetValue() );
	lay.AddChild( hpsb );
	
	hp2txt  = app.CreateText( "Helper Two: " );
	hp2lbl  = app.CreateText( "" );
	lay.AddChild( hp2txt );
	lay.AddChild( hp2lbl );
	hp2sb  = app.CreateSeekBar( 0.8 );
	hp2sb.SetRange( 100 );
	hp2sb.SetValue( 20 );
	hp2sb.SetOnTouch( hp2sb_OnTouch );
	hp2lbl.SetText( hp2sb.GetValue() );
	lay.AddChild( hp2sb );
	//Add layout to app.	
	app.AddLayout( lay );
	
	paylay  = app.CreateLayout( "Linear", "VCenter" );
	ppay  = app.CreateText( "Painter pay:" );
	ppaylbl  = app.CreateText( "$" );
	hpay  = app.CreateText( "HelpOne pay:" );
	hpaylbl  = app.CreateText( "$" );
	h2pay  = app.CreateText( "HelpTwo pay:" );
	h2paylbl  = app.CreateText( "$" );
	paylay.AddChild( ppay );
	paylay.AddChild( ppaylbl );
	paylay.AddChild( hpay );
	paylay.AddChild( hpaylbl );
	paylay.AddChild( h2pay );
	paylay.AddChild( h2paylbl );
	lay.AddChild( paylay );
	calcPay();
}

function calcPay()
{
	var hours  =  hrb.GetValue();
	var rate  =  rsb.GetValue();
	var pr  = prsb.GetValue();
	var h1r  = hpsb.GetValue();
	var h2r  =  hp2sb.GetValue();
	var ttl  =  pr + h1r + h2r; 
	if (ttl < 100)
	{
	var temp = 100-ttl;
	pr += temp;
	prsb.SetValue( pr );
	plbl.SetText(prsb.GetValue());
	}
	if (ttl>100)
	{
	var temp = ttl-100;
	pr -= temp;
	prsb.SetValue(pr);
	plbl.SetText(prsb.GetValue());
	}
	
	var pp,hp,h2p;
	pp  =( hours * pr/100)*rate;
	h1p  =  (hours*h1r/100)*rate;
	h2p  =  (hours*h2r/100)*rate;
	ppaylbl.SetText("$"+ pp );
	hpaylbl.SetText("$"+h1p);
	h2paylbl.SetText( "$"+h2p );
}

function hp2sb_OnTouch(value)
{
	hp2lbl.SetText(value);
	calcPay();
}

function hpsb_OnTouch(value)
{
	hplbl.SetText( value );
	calcPay();
}

function prsb_OnTouch(value)
{
	plbl.SetText(value);
	calcPay();
}

function rsb_OnTouch(value)
{
	app.ShowPopup( value );
	rlbl.SetText(value );
	calcPay();
}

function hrb_OnTouch( value )
{
		hlbl.SetText(value);
    app.ShowPopup( "Value = " + value );
    calcPay();
